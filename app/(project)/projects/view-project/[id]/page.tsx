import { GetSession } from "@/actions/auth-action";
import { GetProject, UpdateStatus } from "@/actions/project-action";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default async function ViewProject({params}: {params: Promise<{id : string}>}) {

  // check authentication status
  const session = await GetSession();

  if (!session) {
    redirect('/sign-in');
  }

  // get id from params and fetch data
  const { id } = await params;
  const data = await GetProject(id);

  // form action to update data
  async function formAction(formData: FormData) {
    'use server';

    const status = formData.get('project_status') as string;

    const res = await UpdateStatus(id, status);

    if (res?.res && res?.error === 'Failed') {
      console.error(res?.error);
    }
  }

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center"
    >
      <div className="h-auto w-[90%] flex flex-col justify-center items-center
        gap-12"
      >
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-heading font-medium
            text-stone-900 dark:text-white"
          >
            Project Details
          </h2>
        </div>
        <div className="h-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full left">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Client name
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-heading font-medium
                text-stone-900 dark:text-white truncate"
              >
                {data?.clientName}
              </h2>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full text-right lg:text-center">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Client email
              </h2>
            </div>
            <div className="h-auto w-full text-right lg:text-center">
              <h2 className="text-lg font-heading font-medium
                text-stone-900 dark:text-white truncate"
              >
                {data?.clientEmail}
              </h2>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full text-left lg:text-center">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Project status
              </h2>
            </div>
            <div className="h-auto w-full text-left lg:text-center">
              <h2 className={`text-lg font-heading font-medium
                ${data?.status === 'New' ? 'text-green-700' : ''}
                ${data?.status === 'Completed' ? 'text-green-600' : ''}
                ${data?.status === 'Pending'  ? 'text-blue-700' : ''}
                ${data?.status === 'In Progress'  ? 'text-blue-600' : ''}
                ${data?.status === 'Cancelled' ? 'text-red-600' : ''}
                `}
              >
                {data?.status}
              </h2>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full text-right">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Budget
              </h2>
            </div>
            <div className="h-auto w-full text-right">
              <h2 className="text-lg font-heading font-medium
                text-stone-900 dark:text-white truncate"
              >
                {`$${data?.budget}`}
              </h2>
            </div>
          </div>
        </div>
        <div className="h-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="h-auto w-full flex flex-col
            justify-center items-center gap-2"
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Created at
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-heading font-medium
                text-stone-900 dark:text-white truncate"
              >
                {
                  data?.createdAt
                  ? format(new Date(data.createdAt), 'dd MMM yyyy')
                  : 'N/A'
                }
              </h2>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col
            justify-center items-center gap-2"
          >
            <div className="h-auto w-full text-right lg:text-center">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Deadline
              </h2>
            </div>
            <div className="h-auto w-full text-right lg:text-center">
              <h2 className="text-lg font-heading font-medium
                text-stone-900 dark:text-white truncate"
              >
                {
                  data?.deadline
                  ? format(new Date(data.deadline), 'dd MMM yyyy')
                  : 'N/A'
                }
              </h2>
            </div>
          </div>
          <div className="h-auto w-full flex flex-col
            justify-center items-center gap-3 col-span-2"
          >
            <div className="h-auto w-full text-left lg:text-right">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Upate Status
              </h2>
            </div>
            <div className="h-auto w-full">
              <form
                action={formAction}
                className="h-auto w-full flex justify-end items-center gap-5"
              >
                <div className="h-auto w-[70%] lg:w-[50%]">
                  <Select
                  name="project_status"
                  >
                  <SelectTrigger className="w-full py-5 font-text font-medium">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="font-text font-medium">
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                  </Select>
                </div>
                <div className="h-auto w-auto">
                  <button
                    type="submit"
                    className="w-auto px-6 py-2 text-base font-text font-medium
                    rounded cursor-pointer text-white bg-active"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="h-auto w-full flex flex-col justify-center items-center
          gap-2"
        >
          <div className="h-auto w-full text-left">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Project title
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-heading font-medium
                text-stone-900 dark:text-white"
              >
                {data?.title}
              </h2>
            </div>
        </div>
        <div className="h-auto w-full flex flex-col justify-center items-center
          gap-2"
        >
          <div className="h-auto w-full text-left">
              <h2 className="text-base font-heading font-medium
                text-stone-700 dark:text-stone-300"
              >
                Project description
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-heading font-medium
                text-stone-900 dark:text-white"
              >
                {data?.description}
              </h2>
            </div>
        </div>
      </div>
    </div>
  )
}