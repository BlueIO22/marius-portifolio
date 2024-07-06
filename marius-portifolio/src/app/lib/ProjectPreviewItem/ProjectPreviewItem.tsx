import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ProjectPreviewItem({ project }: { project: any }) {
  return (
    <Card className="border-2   border-primary bg-primary w-full h-[600px]  rounded-none">
      <img
        className="brightness-50 absolute z-[10] w-full h-full object-cover object-top"
        src={project.image}
      ></img>
      <CardContent className="md:w-[500px] absolute flex p-5 md:flex-row gap-5 flex-col justify-start text-white z-[100]">
        <div className="flex flex-col gap-5 p-5 border-primary border-2 shadow-lg bg-white text-primary">
          <h2 className="text-3xl">{project.title}</h2>
          <p className="text-lg">{project.description}</p>
          <Link href={"/prosjekter/" + project.slug}>
            <Button className="border-2  border-primary bg-white text-primary rounded-none w-[200px] hover:text-white hover:bg-primary">
              Les mer
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
