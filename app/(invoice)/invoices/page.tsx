import { GetSession } from "@/actions/auth-action";
import { GetInvoices } from "@/actions/invoice-action";
import { redirect } from "next/navigation";
import Link from "next/link";
import InvoiceFilter from "@/components/invoice-filter";
import InvoiceTable from "@/components/Invoice-table";

export default async function Invoices({
  searchParams
}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>}) {

  // check authentication status first
  const session = await GetSession();

  if (!session) {
    redirect('/sign-in');
  }

  // get search params and fetch data
  const { status } = await searchParams;
  const invoiceStatus = status as string;
  const data = await GetInvoices(invoiceStatus);

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
            Invoices
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-auto">
            <h2 className="text-base font-text font-medium
              text-stone-700 dark:text-stone-300"
            >
              Recent Invoices
            </h2>
          </div>
          <div className="h-auto w-auto">
            <Link href={'/invoices/new-invoice'}>
            <button
              className="w-auto px-6 py-2 text-base font-text
              font-medium rounded cursor-pointer text-white bg-active"
            >
              New Invoice
            </button>
            </Link>
          </div>
        </div>
        <InvoiceFilter />
        <InvoiceTable data={data ?? []} />
      </div>
    </div>
  )
}