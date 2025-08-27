import { GetTasks } from "@/actions/task-action";
import Link from "next/link";
import TaskCard from "@/components/Task-card";
import Alert from "@/components/Alert";
import { Suspense } from "react";
import CardsSkeleton from "@/components/Cards-skeleton";

interface TaskData {
  id: string;
  Title: string;
  priority: string;
  status: string | null;
}

export const dynamic = 'force-dynamic';

function Tasks({ taskData }: { taskData: TaskData }) {
  return (
    <TaskCard 
      id={taskData.id}
      title={taskData.Title}
      priority={taskData.priority}
      status={taskData.status}
    />
  )
}

export default async function Transactions() {

  // get tasks
  const tasks = await GetTasks();

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
            Tasks
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto">
            <h2 className="text-base font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Recent Tasks
            </h2>
          </div>
          <div className="h-auto w-auto">
            <Link href={'/tasks/new-task'}>
            <button
              className="w-auto px-6 py-2 text-base font-text
              font-medium rounded cursor-pointer text-white bg-active"
            >
              New Task
            </button>
            </Link>
          </div>
        </div>
        {
          tasks?.length === 0 && <Alert />
        }
        {
          !(tasks?.length === 0) && <div className="h-auto w-full 
              grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {
                tasks?.map((data, i) => (
                  <Suspense fallback={<CardsSkeleton />} key={i}>
                    <Tasks taskData={data} />
                  </Suspense>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}