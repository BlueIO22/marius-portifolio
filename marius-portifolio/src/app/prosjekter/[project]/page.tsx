"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { client } from "@/util/sanity";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Dispatch, useEffect, useState } from "react";
import PackmanLoader from "react-spinners/PacmanLoader";

type SpecificProject = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  url: string;
  slug: string;
  technologies: { title: string; description: string }[];
};

async function fetchProjectBySlug(
  slug: string,
  setProject: Dispatch<SpecificProject>,
  setLoading: Dispatch<boolean>
) {
  if (!slug) {
    return null;
  }

  setLoading(true);

  client
    .fetch(
      `*[_type == "project" && slug.current == $slug] [0] {
    title,
    subtitle,
    description,
    "image": images[0].asset->url,
    duration,
    url,
    "slug": slug.current,
    technologies[]->{
      title, 
      description
    }
  }`,
      { slug },
      {
        next: {
          revalidate: 60,
        },
      }
    )
    .then((res) => {
      setLoading(false);

      console.log(res);
      if (res) {
        setProject(res);
      }
    });
}

export default function Page({ params }: { params: any }) {
  const [project, setProject] = useState<SpecificProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjectBySlug(params.project, setProject, setLoading);
  }, []);

  if (loading) {
    return (
      <div className="container absolute top-1/2 left-1/4">
        <PackmanLoader /> Henter prosjekt ...
      </div>
    );
  }

  if (!project) {
    return <div>Prosjektet ble ikke funnet</div>;
  }

  return (
    <div className="bg-primary h-[100dvh] ">
      <div className="md:container w-full overflow-x-hidden ">
        <div className="md:p-10 lg:mt-[100px]  bg-white  lg:overflow-x-hidden p-5 flex flex-col md:flex-row w-full justify-start items-start md:items-center md:justify-center lg:h-[600px] h-[100dvh]">
          <Card className="order-2 md:order-1  md:p-10 p-5 md:col-span-1 border-0 shadow-none w-full">
            <CardTitle className="text-5xl mt-2 md:mt-0">
              {params.projectSlug}
            </CardTitle>
            <CardSubtitle className="mt-2">{project.subtitle}</CardSubtitle>
            <CardDescription className="text-xl mt-10 md:w-[500px]">
              <span className="font-bold mr-2">Beskrivelse:</span>
              <span className="text-black">{project.description}</span>
            </CardDescription>
            <CardFooter className="flex flex-col gap-5 text-xl justify-start items-start p-0 mt-10">
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <span className="font-bold mr-2  text-muted-foreground">
                    Teknologi:
                  </span>
                  <ul className="[&>div]:mr-2">
                    {project.technologies.map((tech, index) => (
                      <HoverCard key={index}>
                        <HoverCardTrigger className="mt-2 mr-2" asChild>
                          <Button
                            className="text-sm bg-primary text-white p-2 hover:decoration-none"
                            variant="link"
                          >
                            {tech.title}
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-[400px] max-h-[200px] lg:w-[600px] bg-white border-2 border-primary overflow-y-scroll overflow-x-hidden lg:max-h-[400px]">
                          <div className="flex flex-col gap-2">
                            <h4>{tech.title}</h4>
                            <p className="text-sm">{tech.description}</p>
                            <p className="text-xs">Kilde: Wikipedia</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-5 text-sm">
                Besøk gjerne{" "}
                <Link
                  target="_blank"
                  className="border-b-2 hover:p-1 hover:bg-primary hover:border-b-0 hover:text-white border-primary border-dashed"
                  href={project.url}
                >
                  {project.title}
                </Link>
              </p>
            </CardFooter>
          </Card>
          <Card className="order-1 md:order-2 md:col-span-2 border-2 border-primary rounded-none shadow-xl">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              className="ml-2 mr-2"
            >
              <CarouselContent>
                <CarouselItem>
                  <img src="/images/foross-preview.png"></img>
                </CarouselItem>
                <CarouselItem>
                  <img src="/images/foross-preview.png"></img>
                </CarouselItem>
                <CarouselItem>
                  <img src="/images/foross-preview.png"></img>
                </CarouselItem>
                <CarouselItem>
                  <img src="/images/foross-preview.png"></img>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden md:block" />
              <CarouselNext className="hidden md:block" />
            </Carousel>
          </Card>
        </div>
      </div>
    </div>
  );
}
