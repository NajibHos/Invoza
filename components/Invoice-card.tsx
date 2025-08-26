import { GetInvoices } from "@/actions/invoice-action"
import InvoiceTable from "./Invoice-table";

export default async function InvoiceCard({ userId }: { userId: string }) {

    const invoices = await GetInvoices(undefined, userId);

    return (
        <div className="h-auto w-full p-6 flex flex-col justify-center items-center
          gap-5 bg-card-light dark:bg-card rounded"
        >
          <div className="h-auto w-full text-left">
            <h2 className="text-lg font-text font-medium
              text-stone-700 dark:text-stone-300">
              Recent Invoices
            </h2>
          </div>
          <div className="h-auto w-full">
              <InvoiceTable data={invoices ?? []} />
          </div>
        </div>
    )
}