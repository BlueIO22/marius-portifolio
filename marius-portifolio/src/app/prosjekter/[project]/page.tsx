"use client";

import { Badge } from "@/components/ui/badge";
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
import Autoplay from "embla-carousel-autoplay";

export default function Page({ params }: { params: any }) {
  const project = params.project ?? "Udefinert prosjekt";
  return (
    <div className="bg-primary h-[100dvh] ">
      <div className="md:container w-full overflow-x-hidden ">
        <div className="md:p-10 lg:mt-[100px]  bg-white  lg:overflow-x-hidden p-5 flex flex-col md:flex-row w-full justify-start items-start md:items-center md:justify-center lg:h-[600px] h-[100dvh]">
          <Card className="order-2 md:order-1  md:p-10 p-5 md:col-span-1 border-0 shadow-none w-full">
            <CardTitle className="text-5xl mt-2 md:mt-0">
              {params.project}
            </CardTitle>
            <CardSubtitle className="mt-2">
              Et prosjekt for foross.no redaksjonen
            </CardSubtitle>
            <CardDescription className="text-xl mt-10 md:w-[500px]">
              <span className="font-bold mr-2">Beskrivelse:</span>
              <span className="text-black">
                Foross.no er en kristen ressursnettside som har som mål å
                formidle kristen tro og liv. Jeg har laget en ny nettside for
                dem som er raskere, mer moderne og mer brukervennlig enn den
                gamle nettsiden.
              </span>
            </CardDescription>
            <CardFooter className="text-xl flex flex-col justify-start items-start p-0 mt-10">
              <span className="font-bold mr-2  text-muted-foreground">
                Teknologi:
              </span>
              <ul className="[&>div]:mr-2">
                <Badge>React</Badge>
                <Badge>Next.js</Badge>
                <Badge>Prismic</Badge>
                <Badge>Netlify</Badge>
              </ul>
            </CardFooter>
          </Card>
          <Card className="order-1 md:order-2 md:col-span-2 border-2 border-primary rounded-none shadow-xl">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}
              className="ml-2"
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
