import { GetProjectChartData } from "@/actions/dashboard-action";
import ProjectChart from "./Project-chart";

export default async function ProjectChartCard({ userId }: { userId: string }) {

    const chartData = await GetProjectChartData(userId);

    return (
        <div className="h-auto w-full p-6 flex flex-col justify-center
            items-center gap-5 bg-card-light dark:bg-card rounded"
        >
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Projects by status
              </h2>
            </div>
            <div className="h-auto w-full">
                <ProjectChart data={chartData} />
            </div>
        </div>
    )
}