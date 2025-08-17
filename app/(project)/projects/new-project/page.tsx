'use client';

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { CreateProject } from "@/actions/project-action";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "sonner";
import SubmitButton from "@/components/Submit-button";

export default function NewProject() {

  // check authentication status
  const router = useRouter();
  const { data: session} = authClient.useSession();

  useEffect(() => {
    if (!session) {
      router.push('/sign-in');
    }
  }, [router, session])

  // project related state variables
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  // form action
  async function formAction(formData: FormData) {
    const clientName = formData.get('client_name') as string;
    const clientEmail = formData.get('client_email') as string;
    const title = formData.get('project_title') as string;
    const description = formData.get('project_description') as string;
    const budget = Number(formData.get('project_budget')) as number;
    const status = formData.get('project_status') as string;
    const deadline = date;

    const data = {
      clientName,
      clientEmail,
      title,
      description,
      budget,
      status,
      deadline
    }

    const res = await CreateProject(data);

    if (res?.res && res?.res === 'Failed') {
      console.error(res?.error);
      toast.error('Error creating project');
    } else {
      toast.success('project has been created');
    }
  }

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
            Create Project
          </h2>
        </div>
        <div className="h-auto w-full md:w-[60%] lg:w-[50%] flex justify-center
          items-center"
        >
          <form
            action={formAction}
            className="h-auto w-full flex flex-col justify-center items-center
            gap-8"
          >
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Client name*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="client_name"
                  type="text"
                  required
                  placeholder="Type here"
                  className="py-5 font-text font-medium"
                />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Client email*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="client_email"
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  className="py-5 font-text font-medium"
                />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Project title*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="project_title"
                  type="text"
                  required
                  placeholder="Type here"
                  className="py-5 font-text font-medium"
                />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Project description*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Textarea
                  name="project_description"
                  required
                  placeholder="Type here"
                  className="py-2 font-text font-medium"
                />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Project budget*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="project_budget"
                  type="number"
                  required
                  placeholder="$0000"
                  className="py-5 font-text font-medium"
                />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Project Status
                </h2>
              </div>
              <div className="h-auto w-full">
                <Select
                  defaultValue="New"
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
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Deadline*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      id='date'
                      className="w-full justify-between font-text
                      p-5 bg-transparent"
                    >
                      {date ? date.toLocaleDateString() : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date)
                        setOpen(false)
                      }}
                    />
                </PopoverContent>
              </Popover>
              </div>
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  )
}