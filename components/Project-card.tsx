'use client';

import { RemoveProject } from "@/actions/project-action";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

interface ProjectData {
  id: string;
  title: string,
  description: string;
  status: string
}

export default function ProjectCard({ id, title, description, status }: ProjectData) {

  const [isPending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await RemoveProject(id);

      if (res?.res && res?.res === 'Failed') {
        console.error(res?.error);
        toast.error('Error removing project');
      } else {
        toast.success('Project has been removed');
      }
    });
  };

  return (
    <div className="h-auto w-full p-6 flex flex-col justify-center items-center
      gap-4 bg-white dark:bg-card rounded"
    >
      <div className="h-auto w-full flex justify-between items-center">
        <div className="h-auto w-[70%] text-left">
          <h2 className="text-lg font-heading font-medium
            text-stone-900 dark:text-white truncate"
          >
            {title}
          </h2>
        </div>
        <div className="h-auto w-[25%] text-right">
          <h2 className={`text-base font-heading font-medium truncate
            ${status === 'New' ? 'text-green-700' : ''}
            ${status === 'Pending'  ? 'text-blue-700' : ''}
            ${status === 'In Progress'  ? 'text-blue-600' : ''}
            ${status === 'Completed' ? 'text-green-600' : ''}
            ${status === 'Cancelled' ? 'text-red-600' : ''}
            `}
          >
            {status}
          </h2>
        </div>
      </div>
      <div className="h-auto w-full text-left">
        <p className="text-base font-text font-medium
          text-stone-700 dark:text-stone-300 truncate"
        >
          {description}
        </p>
      </div>
      <div className="h-auto w-full flex justify-start items-center gap-6">
        <div className="h-auto w-auto">
          <Link href={`/projects/view-project/${id}`}>
          <button
            className="w-auto px-3 py-1 text-base font-text font-medium
            rounded cursor-pointer text-white bg-blue-600"
          >
            View
          </button>
          </Link>
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