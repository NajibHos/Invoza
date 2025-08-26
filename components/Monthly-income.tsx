import { GetIncomeThisMonth } from "@/actions/dashboard-action";

export default async function MonthlyIncomeCard({ userId }: { userId: string}) {

    // get pending projects
    const total = await GetIncomeThisMonth(userId);
  
    return (
      <div className="h-auto w-full px-6 py-8 flex flex-col justify-center
        items-center gap-5 rounded bg-card-light dark:bg-card "
      >
        <div className="h-auto w-full text-left">
          <h2 className="text-lg font-text font-medium
            text-stone-700 dark:text-stone-300"
          >
            Income this month
          </h2>
        </div>
        <div className="h-auto w-full text-left">
          <h2 className="text-2xl font-text font-medium
            text-stone-900 dark:text-white"
          >
            {`$${total || '$0'}`}
          </h2>
        </div>
      </div>
    )
  }