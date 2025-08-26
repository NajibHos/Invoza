import { GetSession } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import { Suspense} from "react";
import Link from "next/link";
import { ChartNoAxesGantt, FileText, ListTodo } from "lucide-react";
import CardSkeleton from "@/components/Card-skeleton";
import PendingProjectCard from "@/components/Pending-projects";
import CompletedProjectCard from "@/components/Completed-projects";
import PendingPaymentCard from "@/components/Pending-payments";
import MonthlyIncomeCard from "@/components/Monthly-income";
import IncomeChartCard from "@/components/Income-chart-card";
import ChartSkeleton from "@/components/chart-skeleton";
import ProjectChartCard from "@/components/Project-chart-card";
import InvoiceSkeleton from "@/components/Invoice-skeleton";
import InvoiceCard from "@/components/Invoice-card";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {

  // check authentication status before proceeding futher
  const session = await GetSession();

  // get current user name and user id
  const userID = session?.user.id ?? '';
  const userName = session?.user.name;

  // if session do not exist, navigate user to sign-in page
  if (!session) {
    redirect('/sign-in');
  }

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
          <Suspense fallback={<CardSkeleton />}>
            <MonthlyIncomeCard userId={userID} />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <PendingPaymentCard userId={userID} />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <CompletedProjectCard userId={userID} />
          </Suspense>
          <Suspense fallback={<CardSkeleton />}>
            <PendingProjectCard userId={userID} />
          </Suspense>
        </div>
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<ChartSkeleton />}>
            <IncomeChartCard userId={userID} />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <ProjectChartCard userId={userID} />
          </Suspense>
        </div>
        <div className="h-auto w-full">
          <Suspense fallback={<InvoiceSkeleton />}>
            <InvoiceCard userId={userID} />
          </Suspense>
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