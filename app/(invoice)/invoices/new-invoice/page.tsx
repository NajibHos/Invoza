'use client';


import { authClient } from "@/lib/auth/auth-client";
import { CreateInvoice } from "@/actions/invoice-action";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

function SubmitButton() {

  const { pending } = useFormStatus();

  return (
    <div className="h-auto w-full text-left">
      <button
        type="submit"
        disabled={pending}
        className="w-full lg:w-auto p-0 lg:px-6 py-2 text-base
        font-text font-medium rounded cursor-pointer text-white
        bg-active disabled:bg-blue-500"
      >
        {pending ? 'Creating Invoice' : 'Create Invoice'}
      </button>
    </div>
  )
}

export default function NewInvoice() {

  // check authentication status first
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/sign-in');
    }
  }, [session, isPending, router])

  // invoice related state variables
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const amount = price * quantity;

  // form action
  async function formAction(formData: FormData) {
    const dueDate = date;
    const billerName = formData.get('biller_name') as string;
    const billerEmail = formData.get('biller_email') as string;
    const billerAddress = formData.get('biller_address') as string;
    const clientName = formData.get('client_name') as string;
    const clientEmail = formData.get('client_email') as string;
    const clientAddress = formData.get('client_address') as string;
    const description = formData.get('project_description') as string;
    const price = Number(formData.get('project_price')) as number;
    const quantity = Number(formData.get('project_quantity')) as number;
    const total = amount as number;
    const status = 'Pending' as string;

    const data = {
      dueDate,
      billerName,
      billerEmail,
      billerAddress,
      clientName,
      clientEmail,
      clientAddress,
      description,
      price,
      quantity,
      total,
      status
    }

    const res = await CreateInvoice(data);

    if (res?.res && res?.res === 'Failed') {
      console.error(res?.error)
      toast.error('Error creating invoice');
    } else {
      toast.success('Invoice has been created');
    }

    // reset date, price, and quantity
    setDate(undefined);
    setPrice(0);
    setQuantity(1);
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
            Create Invoice
          </h2>
        </div>
        <div className="h-auto w-full flex justify-center items-center">
          <form
            action={formAction}
            className="h-auto w-full flex flex-col justify-center items-start
            gap-8"
          >
            <div className="h-auto w-full flex flex-col justify-center
              items-start gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  #Invoice Id
                </h2>
              </div>
              <div className="h-auto w-auto">
                <Input
                  name="invoice_id"
                  type="number"
                  required
                  placeholder="auto genarated"
                  disabled
                  className="py-5 font-text font-medium"
                />
              </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-auto w-full flex flex-col justify-center
                items-center gap-3"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Bill from:
                  </h2>
                </div>
                <div className="h-auto w-full flex flex-col justify-center
                  items-center gap-6 lg:gap-8"
                >
                  <div className="h-auto w-full">
                    <Input
                      name="biller_name"
                      type="text"
                      required
                      placeholder="Biller name*"
                      className="py-5 font-text font-medium"
                    />
                  </div>
                  <div className="h-auto w-full">
                    <Input
                      name="biller_email"
                      type="text"
                      required
                      placeholder="Biller email*"
                      className="py-5 font-text font-medium"
                    />
                  </div>
                  <div className="h-auto w-full">
                    <Input
                      name="biller_address"
                      type="text"
                      required
                      placeholder="Biller address*"
                      className="py-5 font-text font-medium"
                    />
                  </div>
                </div>
              </div>
              <div className="h-auto w-full flex flex-col justify-center
                items-center gap-3"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Bill to:
                  </h2>
                </div>
                <div className="h-auto w-full flex flex-col justify-center
                  items-center gap-6 lg:gap-8"
                >
                  <div className="h-auto w-full">
                    <Input
                      name="client_name"
                      type="text"
                      required
                      placeholder="Client name*"
                      className="py-5 font-text font-medium"
                    />
                  </div>
                  <div className="h-auto w-full">
                    <Input
                      name="client_email"
                      type="text"
                      required
                      placeholder="Client email*"
                      className="py-5 font-text font-medium"
                    />
                  </div>
                  <div className="h-auto w-full">
                    <Input
                      name="client_address"
                      type="text"
                      required
                      placeholder="Client address*"
                      className="py-5 font-text font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-auto w-full flex flex-col justify-center
                items-center gap-3"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Issue date:
                  </h2>
                </div>
                <div className="h-auto w-full flex flex-col justify-center
                  items-center"
                >
                  <div className="h-auto w-full">
                    <Input
                      name="issue_date"
                      type="text"
                      placeholder="auto genarated"
                      disabled
                      className="py-5 font-text font-medium"
                    />
                  </div>
                </div>
              </div>
              <div className="h-auto w-full flex flex-col justify-center
                items-center gap-3"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Due date:
                  </h2>
                </div>
                <div className="h-auto w-full flex flex-col justify-center
                  items-center"
                >
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
              </div>
            </div>
            <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-6 gap-8">
              <div className="h-auto w-full flex flex-col justify-center
                items-start gap-2 lg:col-span-3"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Description
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
                items-start gap-2"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Price
                  </h2>
                </div>
                <div className="h-auto w-full">
                  <Input
                    name="project_price"
                    type="number"
                    required
                    placeholder="$0"
                    className="py-5 font-text font-medium"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="h-auto w-full flex flex-col justify-center
                items-start gap-2"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Quantity
                  </h2>
                </div>
                <div className="h-auto w-full">
                  <Input
                    name="project_quantity"
                    type="number"
                    defaultValue={1}
                    min={1}
                    onChange={(ev) => setQuantity(Number(ev.target.value))}
                    className="py-5 font-text font-medium"
                  />
                </div>
              </div>
              <div className="h-auto w-full flex flex-col justify-center
                items-start gap-2"
              >
                <div className="h-auto w-full text-left">
                  <h2 className="text-base font-text font-medium
                    text-stone-700 dark:text-stone-300"
                  >
                    Amount
                  </h2>
                </div>
                <div className="h-auto w-full">
                  <Input
                    name="project_amount"
                    type="number"
                    value={amount}
                    disabled
                    className="py-5 font-text font-medium"
                  />
                </div>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-start gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-base font-text font-medium
                  text-stone-700 dark:text-stone-300"
                >
                  Total
                </h2>
              </div>
              <div className="h-auto w-auto">
                <Badge variant="secondary" className="text-base">
                 {`$${amount}`}
                </Badge>
              </div>
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  )
}