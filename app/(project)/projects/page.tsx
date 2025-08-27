import { GetProjects } from "@/actions/project-action";
import Link from "next/link";
import Alert from "@/components/Alert";
import ProjectCard from "@/components/Project-card";
import ProjectFilter from "@/components/Project-filter";
import { Suspense } from "react";
import CardsSkeleton from "@/components/Cards-skeleton";

interface ProjectData {
  id: string;
  title: string;
  description: string;
  status: string;
}

export const dynamic = 'force-dynamic';

function Projects({ projectData }: { projectData: ProjectData }) {
  return (
    <ProjectCard 
      id={projectData.id}
      title={projectData.title}
      description={projectData.description}
      status={projectData.status}
    />
  )
}

export default async function Projets({
  searchParams
}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) {

  // get search params and fetch data
  const { status } = await searchParams;
  const projectStatus = status as string;
  const projects = await GetProjects(projectStatus);

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center"
    >
      <div className="h-auto w-[90%] flex flex-col justify-center items-center
        gap-16 lg:gap-12"
      >
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-heading font-medium
            text-stone-900 dark:text-white"
          >
            Projects
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto">
            <h2 className="text-base font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Recent Projects
            </h2>
          </div>
          <div className="h-auto w-auto">
            <Link href={'/projects/new-project'}>
            <button
              className="w-auto px-6 py-2 text-base font-text
              font-medium rounded cursor-pointer text-white bg-active"
            >
              New Project
            </button>
            </Link>
          </div>
        </div>
        <ProjectFilter />
        {
          projects?.length === 0 && <Alert />
        }
        {
          !(projects?.length === 0) && <div className="h-auto w-full
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {
                projects?.map((data, i) => (
                  <Suspense fallback={<CardsSkeleton />} key={i}>
                    <Projects projectData={data} />
                  </Suspense>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}