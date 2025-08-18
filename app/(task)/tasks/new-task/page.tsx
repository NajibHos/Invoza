'use client';

import { CreateTask } from "@/actions/task-action";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/Submit-button";
import { toast } from "sonner";

export default function NewTask() {

  // form action
  async function formAction(formData: FormData) {
    const title = formData.get('task_title') as string;
    const priority = formData.get('task_priority') as string;

    const res = await CreateTask(title, priority);

    if (res?.res && res?.res === 'Failed') {
      console.error(res?.error);
      toast.error('Error creating task');
    } else {
      toast.success('Task has been created');
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
            Create Task
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
                  Title*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Input
                  name="task_title"
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
                  Priority*
                </h2>
              </div>
              <div className="h-auto w-full">
                <Select
                  name="task_priority"
                  required
                >
                  <SelectTrigger className="w-full py-5 font-text font-medium">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="font-text font-medium">
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  )
}