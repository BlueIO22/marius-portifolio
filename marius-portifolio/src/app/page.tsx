import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectPreviewItem from "./lib/ProjectPreviewItem/ProjectPreviewItem";

export default function Home() {
  return (
    <main
      suppressHydrationWarning
      className="z-20 relative  bg-primary  overflow-x-hidden"
    >
      <div className="z-20 container">
        <Card className="lg:p-10 bg-white md:mt-[100px] md:mb-[100px] rounded-none border-none shadow-none">
          <CardHeader className="lg:text-3xl text-2xl">
            Litt om Marius Sørenes
          </CardHeader>
          <CardContent>
            <div>
              <div className="col-span-2 flex md:flex-row flex-col items-center justify-center w-full">
                <img
                  height={200}
                  width={200}
                  className="mr-5"
                  src="/images/marius-profile.jpg "
                  alt=""
                />
                <div className="mt-5 md:mt-0">
                  <p>
                    Eg er ein snart 30 år gammel utviklar som er gift har ett
                    barn på ett og et halvt. Min store lidenskap er å skrive
                    kode å utforme digitale løsninger som er brukervennlige og
                    funksjonelle. Jeg har jobbet som utvikler i 5 år og har
                    jobbet med alt fra små nettsider til store komplekse
                    systemer. Eg har spesiell interresse i webutvikling og har
                    jobbet mye med frontend rammeverk som react og vue.
                  </p>
                  <p className="mt-2">
                    Eg har også stor glede av å skrive backend og har god
                    erfaring med både .Net rammeverket og Java/Kotlin. Også
                    liker eg godt og tulle litt rundt i SQL, alltid kjekt med
                    noko data
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className=" md:mt-[100px] md:mb-[100px] p-0 bg-transparent border-none shadow-none">
          <CardHeader className="pl-2 text-2xl font-bold shadow-none  text-white ">
            Mine prosjekter
          </CardHeader>
          <CardContent className="p-0">
            <p className="p-2 text-white">
              Her er nokre av mine prosjekter som eg har jobbet med
            </p>
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <ProjectPreviewItem
                    project={{
                      title: "Ny nettside til foross.no",
                      image: "/images/foross-preview.png",
                      description: `Foross.no er en kristen ressursnettside som har som mål å formidle kristen tro og liv. Jeg har laget en ny nettside for dem som er raskere, mer moderne og mer brukervennlig enn den gamle nettsiden.
`,
                      slug: "foross",
                    }}
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden md:block" />
              <CarouselNext className="hidden md:block" />
            </Carousel>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
