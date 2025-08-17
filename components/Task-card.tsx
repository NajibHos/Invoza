'use client';

import { RemoveTask, UpdateStatus } from "@/actions/task-action";
import { useTransition } from "react";
import { toast } from "sonner";

interface TaskType {
  id: string;
  title: string;
  priority: string;
  status: string | null;
}

export default function TaskCard({id, title, priority, status}: TaskType) {

  const [isPending, startTransition] = useTransition();

  function InProgress(id: string, status: string) {
    startTransition(async () => {
      const res = await UpdateStatus(id, status);

      if (res?.res && res?.res === 'Failed') {
        console.error(res?.error);
        toast.error('Error updating status');
      } else {
        toast.success('Status has been updated');
      }
    });
  };

  function Done(id: string, status: string) {
    startTransition(async () => {
      const res = await UpdateStatus(id, status);

      if (res?.res && res?.res === 'Failed') {
        console.error(res?.error);
        toast.error('Error updating status');
      } else {
        toast.success('Status has been updated');
      }
    });
  };

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await RemoveTask(id);

      if (res?.res && res?.res === 'Failed') {
        console.error(res?.error);
        toast.error('Error removing task');
      } else {
        toast.success('Task has been removed');
      }
    })
  };

  return (
  <div className="h-auto w-full p-6 flex flex-col justify-center items-center
    gap-4 bg-white dark:bg-card rounded"
  >
    <div className="h-auto w-full text-left">
      <h2 className={`text-lg font-text font-medium
        text-stone-900 dark:text-white
        ${status === 'Done' && 'line-through'}`}
      >
        {title}
      </h2>
    </div>
    <div className="h-auto w-full flex justify-between items-center">
      <div className="h-auto w-[30%] text-left">
        <h2 className="text-base font-text font-medium
          text-stone-700 dark:text-stone-300"
        >
          Priority:
          <span className={`
            ${priority === 'High' ? 'text-red-700' : ''}
            ${priority === 'Medium' ? 'text-blue-700' : ''}
            ${priority === 'low' ? 'text-green-700' : ''}
            text-lg ml-2
            `}
          >
            {priority}
          </span>
        </h2>
      </div>
      <div className="h-auto w-[60%] text-right">
        <h2 className="text-base font-text font-medium
          text-stone-700 dark:text-stone-300"
        >
          Status:
          <span className={`
            ${status === 'Pending' ? 'text-lime-700' : ''}
            ${status === 'In Progress' ? 'text-blue-700' : ''}
            ${status === 'Done' ? 'text-green-700' : ''}
            text-lg ml-2
            `}
          >
            {status}
          </span>
        </h2>
      </div>
    </div>
    <div className="h-auto w-full flex justify-between items-center">
      <div className="h-auto w-auto flex justify-center items-center gap-5">
        <div className="h-auto w-auto">
        <button
          onClick={() => InProgress(id, 'In Progress')}
          disabled={isPending}
          className="w-auto px-3 py-1 text-base font-text font-medium
          rounded cursor-pointer text-white bg-blue-600 disabled:bg-blue-500"
        >
          In Progress
        </button>
        </div>
        <div className="h-auto w-auto">
        <button
          onClick={() => Done(id, 'Done')}
          disabled={isPending}
          className="w-auto px-3 py-1 text-base font-text font-medium
          rounded cursor-pointer text-white bg-green-600 disabled:bg-green-500"
        >
          Done
        </button>
        </div>
      </div>
      <div className="h-auto w-auto">
        <button
          onClick={() => handleDelete(id)}
          disabled={isPending}
          className="w-auto px-3 py-1 text-base font-text font-medium
          rounded cursor-pointer text-white bg-red-600 disabled:bg-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
  )
}