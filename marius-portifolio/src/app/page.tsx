import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectPreviewItem from "./lib/ProjectPreviewItem/ProjectPreviewItem";

export default function Home() {
  return (
    <main
      suppressHydrationWarning
      className="z-20 relative h-[100dvh] bg-white  overflow-x-hidden"
    >
      <div className="z-20">
        <Card className="z-20 w-full md:w-[600px] m-10 mb-0 bg-transparent rounded-none shadow-none border-none">
          <CardHeader>
            <CardTitle className="md:text-2xl text-xl">
              <span>
                Velkommen til{" "}
                <span className="block md:inline bg-primary text-3xl text-white p-2">
                  Marius Sørenes
                </span>{" "}
                sin portifolio
              </span>
              <span className="block text-base italic mt-5">
                <FontAwesomeIcon icon={faQuoteLeft} /> Å skrive kode er en
                lidenskap, å lage nettsider er en kunstform{" "}
                <FontAwesomeIcon icon={faQuoteRight} />
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="md:m-10 p-0 bg-transparent border-none shadow-none">
          <CardHeader className="text-2xl font-bold border-primary border-2 shadow-none m-5 p-5 text-primary w-[300px]">
            Mine prosjekter
          </CardHeader>
          <CardContent>
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <ProjectPreviewItem
                    project={{
                      title: "Ny nettside til foross.no",
                      image: "/images/foross-preview.png",
                      description: `Foross.no er en kristen ressursnettside som har som mål å formidle kristen tro og liv. Jeg har laget en ny nettside for dem som er raskere, mer moderne og mer brukervennlig enn den gamle nettsiden.
`,
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
