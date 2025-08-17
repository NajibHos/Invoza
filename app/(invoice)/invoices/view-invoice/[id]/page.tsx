import { GetSession } from "@/actions/auth-action";
import { GetInvoice } from "@/actions/invoice-action";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import InvoiceUpdateButton from "@/components/Invoice-update-button";

export default async function ViewInvoice({
  params
}: {params: Promise<{id: string}>}) {

  // check authentication status
  const session = await GetSession();

  if (!session) {
    redirect('/sign-in');
  }

  // get id from params and fetch data
  const { id } = await params;
  const data = await GetInvoice(id);

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
            INVOICE
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-[48.5%] flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                #Invoice id
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-900 dark:text-white"
              >
                {data?.invoiceId}
              </h2>
            </div>
          </div>
          <div className="h-auto w-[48.5%] flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full text-right lg:text-left">
              <h2 className="text-base font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Status
              </h2>
            </div>
            <div className="h-auto w-full text-right lg:text-left">
              <h2 className={`text-lg font-text font-medium
                ${data?.status === 'Paid' ? 'text-green-600' : ''}
                ${data?.status === 'Pending' ? 'text-blue-600' : ''}
                ${data?.status === 'Unpaid' ? 'text-red-600' : ''}
                `}
              >
                {data?.status}
              </h2>
            </div>
          </div>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-[48.5%] flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full text-left">
              <h2 className="text-base font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Issue date
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-900 dark:text-white"
              >
                {
                  data?.dueDate
                  ? format(new Date(data.dueDate), 'dd MMM yyyy')
                  : 'N/A'
                }
              </h2>
            </div>
          </div>
          <div className="h-auto w-[48.5%] flex flex-col justify-center items-center
            gap-2"
          >
            <div className="h-auto w-full text-right lg:text-left">
              <h2 className="text-base font-text font-medium
                text-stone-700 dark:text-stone-300"
              >
                Due date
              </h2>
            </div>
            <div className="h-auto w-full text-right lg:text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-900 dark:text-white"
              >
                {
                  data?.createdAt
                  ? format(new Date(data.createdAt), 'dd MMM yyyy')
                  : 'N/A'
                }
              </h2>
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
                Bill from:
              </h2>
            </div>
            <div className="h-auto w-full flex flex-col justify-center
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-text text-stone-900 dark:text-white">
                  {data?.billerName}
                </h2>
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-text text-stone-900 dark:text-white">
                  {data?.billerEmail}
                </h2>
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-text text-stone-900 dark:text-white">
                  {data?.billerAddress}
                </h2>
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
              items-center gap-2"
            >
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-text text-stone-900 dark:text-white">
                  {data?.clientName}
                </h2>
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-text text-stone-900 dark:text-white">
                  {data?.clientEmail}
                </h2>
              </div>
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-text text-stone-900 dark:text-white">
                  {data?.clientAddress}
                </h2>
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
            <div className="h-auto w-full text-left">
              <p className="text-lg font-text font-medium
                text-stone-900 dark:text-white"
              >
                {data?.description}
              </p>
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
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-900 dark:text-white"
              >
                {data?.price}
              </h2>
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
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-text font-medium
                text-stone-900 dark:text-white"
              >
                {data?.quantity}
              </h2>
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
              <div className="h-auto w-full text-left">
                <h2 className="text-lg font-text font-medium
                  text-stone-900 dark:text-white"
                >
                  {data?.total}
                </h2>
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
            <Badge variant="secondary" className="text-lg">
              {`${data?.total}`}
            </Badge>
          </div>
        </div>
        <InvoiceUpdateButton id={data?.id} />
      </div>
    </div>
  )
}