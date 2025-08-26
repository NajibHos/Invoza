import { GetMonthlyIncomeChartData } from "@/actions/dashboard-action"
import IncomeChart from "./Income-chart";

export default async function IncomeChartCard({ userId }: { userId: string }) {

    const chartData = await GetMonthlyIncomeChartData(userId);

    return (
        <div className="h-auto w-full p-6 flex flex-col justify-center
            items-center gap-5 bg-card-light dark:bg-card rounded"
        >
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Monthly Income Chart
              </h2>
            </div>
            <div className="h-auto w-full">
                <IncomeChart data={chartData} />
            </div>
        </div>
    )
}