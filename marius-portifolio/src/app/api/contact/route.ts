import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (resets on cold-start; fine for serverless)
const rateMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60_000; // 1 minute
const MIN_ELAPSED_MS = 3_000;  // must wait 3s after page load

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true }); // malformed — silent 200
  }

  const { name, email, message, website, _formLoadedAt } = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
    _formLoadedAt?: number;
  };

  // 1. Honeypot check — bots fill this field
  if (website) {
    return NextResponse.json({ ok: true }); // silent 200
  }

  // 2. Time check — reject if submitted too quickly (< 3s after load)
  if (typeof _formLoadedAt === "number") {
    const elapsed = Date.now() - _formLoadedAt;
    if (elapsed < MIN_ELAPSED_MS) {
      return NextResponse.json({ ok: true }); // silent 200
    }
  }

  // 3. Basic field validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Alle felt må fyllast ut." }, { status: 400 });
  }

  // 4. Rate limit per IP
  const ip = getClientIp(req);
  const now = Date.now();
  const record = rateMap.get(ip);

  if (record) {
    if (now < record.resetAt) {
      if (record.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: "For mange førespurnader. Prøv att seinare." },
          { status: 429 }
        );
      }
      record.count++;
    } else {
      rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    }
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  }

  // 5. Email delivery (stub — wire up with real SMTP later)
  // To enable, set env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO
  //
  // import nodemailer from "nodemailer";
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT ?? 587),
  //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  // });
  // await transporter.sendMail({
  //   from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
  //   to: process.env.CONTACT_TO,
  //   subject: `New message from ${name}`,
  //   text: `From: ${name} <${email}>\n\n${message}`,
  // });

  console.log("[contact] New submission", { name, email, message: message?.slice(0, 80) });

  return NextResponse.json({ ok: true });
}
