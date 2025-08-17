import { GetSession } from "@/actions/auth-action";
import { GetCompletedProjects, GetIncomeThisMonth, GetMonthlyIncomeChartData, GetPendingPayments, GetPendingProjects, GetProjectChartData } from "@/actions/dashboard-action";
import { GetInvoices } from "@/actions/invoice-action";
import Link from "next/link";
import IncomeChart from "@/components/Income-chart";
import InvoiceTable from "@/components/dashboard-invoice-table";
import ProjectChart from "@/components/Project-chart";
import { ChartNoAxesGantt, FileText, ListTodo } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  // check authentication status before proceeding futher
  const session = await GetSession();

  if (!session) {
    redirect('/sign-in');
  }

  // get current user name
  const userName = session?.user.name;

  // fetch data
  const income = await GetIncomeThisMonth();
  const pendingIncome = await GetPendingPayments();
  const completedProjects = await GetCompletedProjects();
  const pendingProjects = await GetPendingProjects();
  const incomeChartData = await GetMonthlyIncomeChartData();
  const projectChartData = await GetProjectChartData();
  const invoiceData = await GetInvoices(undefined);

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center
      dark:bg-dark"
    >
      <div className="h-auto w-[90%] flex flex-col justify-center items-center
        gap-16 lg:gap-12"
      >
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-heading font-medium
            text-stone-900 dark:text-white"
          >
            Dashboard
          </h2>
        </div>
        <div className="h-auto w-full flex flex-col justify-center items-center
          gap-1"
        >
          <div className="h-auto w-full text-left">
            <h2 className="text-lg font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Welcome
              <span className="text-stone-900 dark:text-white ml-1">
                {`${userName}`}
              </span>
            </h2>
          </div>
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Have a great day! ⚡
            </h2>
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2
          lg:grid-cols-4 gap-8"
        >
          <div className="h-auto w-full px-6 py-8 flex flex-col justify-center
            items-center gap-5 rounded bg-card-light dark:bg-card"
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
                {`$${income || 0}`}
              </h2>
            </div>
          </div>
          <div className="h-auto w-full px-6 py-8 flex flex-col justify-center
            items-center gap-5 rounded bg-card-light dark:bg-card "
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Pending payments
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-2xl font-text font-medium
                text-stone-900 dark:text-white"
              >
                {`$${pendingIncome || 0}`}
              </h2>
            </div>
          </div>
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
                {completedProjects || 'No data'}
              </h2>
            </div>
          </div>
          <div className="h-auto w-full px-6 py-8 flex flex-col justify-center
            items-center gap-5 rounded bg-card-light dark:bg-card "
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Pending projects
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-2xl font-text font-medium
                text-stone-900 dark:text-white"
              >
                {pendingProjects || 'No data'}
              </h2>
            </div>
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              <IncomeChart data={incomeChartData} />
            </div>
          </div>
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
              <ProjectChart data={projectChartData} />
            </div>
          </div>
        </div>
        <div className="h-auto w-full p-6 flex flex-col justify-center items-center
          gap-5 bg-card-light dark:bg-card rounded"
        >
          <div className="h-auto w-full text-left">
            <h2 className="text-lg font-text font-medium
              text-stone-700 dark:text-stone-300">
              Recent Invoices
            </h2>
          </div>
          <div className="h-auto w-full">
            <InvoiceTable data={invoiceData ?? []} />
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="h-auto w-full p-6 flex flex-col justify-center
            items-start gap-6 rounded bg-card-light dark:bg-card"
          >
            <div className="h-auto w-full">
              <ChartNoAxesGantt
                size={36}
                className="text-stone-900 dark:text-white"
              />
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-heading font-medium
                  text-stone-900 dark:text-white"
                >
                  Projects
                </h2>
              </div>
              <div className="h-auto w-full text-left">
                <p className="text-base font-heading font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Manage all your ongoing and completed projects
                </p>
              </div>
            </div>
            <div className="h-auto w-full">
              <Link href={'/projects'}>
              <button
                className="w-auto px-6 py-2 text-base font-text
                font-medium rounded cursor-pointer text-white bg-active"
              >
                View
              </button>
              </Link>
            </div>
          </div>
          <div className="h-auto w-full p-6 flex flex-col justify-center
            items-start gap-6 rounded bg-card-light dark:bg-card"
          >
            <div className="h-auto w-full">
              <FileText
                size={36}
                className="text-stone-900 dark:text-white"
              />
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-heading font-medium
                  text-stone-900 dark:text-white"
                >
                  Invoices
                </h2>
              </div>
              <div className="h-auto w-full text-left">
                <p className="text-base font-heading font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Generate, track, and manage invoices for your projects
                </p>
              </div>
            </div>
            <div className="h-auto w-full">
              <Link href={'/invoices'}>
              <button
                className="w-auto px-6 py-2 text-base font-text
                font-medium rouned cursor-pointer text-white bg-active"
              >
                View
              </button>
              </Link>
            </div>
          </div>
          <div className="h-auto w-full p-6 flex flex-col justify-center
            items-start gap-6 rounded bg-card-light dark:bg-card"
          >
            <div className="h-auto w-full">
              <ListTodo
                size={36}
                className="text-zinc-900 dark:text-white"
              />
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-heading font-medium
                  text-zinc-900 dark:text-white"
                >
                  Tasks
                </h2>
              </div>
              <div className="h-auto w-full text-left">
                <p className="text-base font-heading font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Track, manage, and priotize tasks for your projects
                </p>
              </div>
            </div>
            <div className="h-auto w-full">
              <Link href={'/tasks'}>
              <button
                className="w-auto px-6 py-2 text-base font-text
                font-medium rounded cursor-pointer text-white bg-active"
              >
                View
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}