import { GetSession } from "@/actions/auth-action";
import Link from "next/link";

export default async function Home() {

  const session = await GetSession();

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center">
      <div className="h-full w-[90%] lg:w-[60%] flex flex-col
        justify-center items-center gap-6 lg:gap-8"
      >
        <div className="h-auto w-full flex flex-col justify-center
          items-center gap-4"
        >
          <div className="h-auto w-full text-center">
            <h2 className="text-3xl font-heading font-semibold
              text-stone-900 dark:text-white"
            >
              Invoza
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className="text-lg font-heading font-medium
              text-stone-700 dark:text-stone-300"
            >
              From tasks to invoices, manage it all with ease
            </h2>
          </div>
        </div>
        <div className="h-auto w-full text-left">
          <p className="text-base font-text font-medium
            text-stone-700 dark:text-zinc-300 whitespace-pre-wrap"
          >
            Invoza is a modern web application for individuals to manage projects,
            invoices, and tasks all in one place. It comes with real-time database
            support, authentication, PDF invoice generation, and a clean dashboard
            for insights.
          </p>
        </div>
        <div className="h-auto w-full text-left">
          <h2 className="text-base font-text font-medium
            text-stone-700 dark:text-stone-300"
          >
            Built with: <span className="text-stone-900 dark:text-white">
            Next.js, Better Auth, Prisma, Neon, jsPDF, Tailwind, Shadcn UI
            </span>
          </h2>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
          items-start gap-4"
        >
          <div className="h-auto w-full text-left">
            <h2 className="text-base font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Features:
            </h2>
          </div>
          <div className="h-auto w-full">
            <ul className="h-auto w-full list-disc ml-4 text-left
              text-stone-900 dark:text-white"
            >
              <li>
                <h2 className="text-base font-text font-medium
                  text-stone-900 dark:text-white"
                >
                  Manage projects with CRUD operations, status-based filtering,
                  and progress tracking
                </h2>
              </li>
              <li>
                <h2 className="text-base font-text font-medium
                  text-stone-900 dark:text-white"
                >
                  Generate, manage, and download invoices as PDF with payment tracking
                </h2>
              </li>
              <li>
                <h2 className="text-base font-text font-medium
                  text-stone-900 dark:text-white"
                >
                  Create and organize tasks with CRUD operations, status updates,
                  and priority levels in a card-based UI
                </h2>
              </li>
              <li>
                <h2 className="text-base font-text font-medium
                  text-stone-900 dark:text-white"
                >
                  View a smart dashboard with income charts, project stats, recent
                  invoices, and key insights
                </h2>
              </li>
            </ul>
          </div>
        </div>
        {
          session && <div className="h-auto w-auto">
            <Link href={'/dashboard'}>
            <button
              className="w-auto px-6 py-2 text-base font-text
              font-medium rounded cursor-pointer text-white bg-active"
            >
              Dashboard
            </button>
            </Link>
          </div>
        }
        {
          !session && <div className="h-auto w-auto">
            <Link href={'/sign-in'}>
            <button
              className="w-auto px-6 py-2 text-base font-text
              font-medium rounded cursor-pointer text-white bg-active"
            >
              Get Started
            </button>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}