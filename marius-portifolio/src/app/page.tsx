import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { client } from "@/util/sanity";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PortableText } from "next-sanity";
import Link from "next/link";

async function fetchAuthor() {
  const response = await client.fetch(`*[_type == "author"] {
    name,
    bio,
    "image": image.asset->url
  }`);

  return response[0];
}

async function fetchProjects() {
  const response = await client.fetch(`*[_type == "project"] {
    title,
    subtitle,
    description,
    "image": images[0].asset->url,
    duration,
    url,
    "slug": slug.current,
    "technologies": technologies[]->title
  }`);

  return response as Project[];
}

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  url: string;
  slug: string;
};

export default async function Home() {
  const projects = await fetchProjects();
  const author = await fetchAuthor();

  return (
    <main
      suppressHydrationWarning
      className="z-20 relative  bg-primary  overflow-x-hidden"
    >
      <div className="z-20 container">
        <Card className="lg:p-10 bg-white md:mt-[100px] md:mb-[100px] rounded-none border-none shadow-none">
          <CardHeader className="lg:text-3xl text-2xl">
            Litt om {author.name}
          </CardHeader>
          <CardContent>
            <div>
              <div className="col-span-2 flex md:flex-row flex-col items-center justify-center w-full">
                <img
                  height={200}
                  width={200}
                  className="mr-5"
                  src={author.image}
                  alt=""
                />
                <div className="mt-5 md:mt-0">
                  <PortableText value={author.bio} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-5 md:mt-[100px] md:mb-[100px] p-0 bg-transparent border-none shadow-none">
          <CardHeader className="mb-2 text-2xl font-bold shadow-none p-0  text-white ">
            Mine prosjekter
          </CardHeader>
          <CardContent className="p-0">
            <p className="mb-5 text-white">
              Her er nokre av mine prosjekter som eg har jobbet med
            </p>
            <div className="flex flex-row flex-wrap gap-5">
              {projects.map((project: Project, index: number) => (
                <Card
                  key={index}
                  className="shadow-lg rounded-none border-none w-[600px]"
                >
                  <CardHeader className="cool-bg text-2xl">
                    {project.title}
                  </CardHeader>
                  <CardContent className="p-0">
                    <img
                      className="w-full h-full object-cover object-top brightness-50"
                      src={project.image}
                    ></img>
                    <div className="p-5 flex flex-col gap-2">
                      <p className="text-tiny">
                        <FontAwesomeIcon icon={faCalendarDay} />{" "}
                        {project.duration}
                      </p>
                      <p className="text-xl">{project.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={"prosjekter/" + project.slug}>
                      <button className="bg-primary text-white p-2 rounded-none m-auto">
                        Les mer
                      </button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
