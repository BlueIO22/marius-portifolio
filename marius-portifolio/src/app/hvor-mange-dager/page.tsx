import DagCounter from "@/components/DagCounter";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#020308",
};

export default function Page() {
  return (
    <div style={{ background: "#020308", height: "100dvh", overflow: "hidden" }}>
      <DagCounter />
    </div>
  );
}
