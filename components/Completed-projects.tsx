import { GetCompletedProjects } from "@/actions/dashboard-action";

export default async function CompletedProjectCard({ userId }: { userId: string}) {

    // get pending projects
    const projects = await GetCompletedProjects(userId);
  
    return (
      <div className="h-auto w-full px-6 py-8 flex flex-col justify-center
        items-center gap-5 rounded bg-card-light dark:bg-card "
      >
        <div className="h-auto w-full text-left">
          <h2 className="text-lg font-text font-medium
            text-stone-700 dark:text-stone-300"
          >
            Completed projects
          </h2>
        </div>
        <div className="h-auto w-full text-left">
          <h2 className="text-2xl font-text font-medium
            text-stone-900 dark:text-white"
          >
            {projects || 0}
          </h2>
        </div>
      </div>
    )
  }