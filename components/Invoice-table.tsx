'use client';

import { RemoveInvoice } from "@/actions/invoice-action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import Alert from "./Alert";
import InvoicePdfButton from "./Invoice-pdf";

type InvoiceType = {
  id: string;
  invoiceId: string;
  status: string;
  createdAt: Date;
  dueDate: Date | null;
  updatedAt: Date | null;
  userId: string | null;
  billerName: string;
  billerEmail: string;
  billerAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
}[] | undefined


export default function InvoiceTable({ invoices }: {invoices: InvoiceType}) {

  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await RemoveInvoice(id);

      if (res?.res && res?.res === 'Failed') {
        console.error(res?.error);
        toast.error('Error deleting invoice');
      } else {
        toast.success('Invoice has been deleted');
      }
    });
  };

  if (invoices?.length === 0) {
    return (
      <div className="h-auto w-full p-6 rounded bg-card-light dark:bg-card">
        <Alert />
      </div>
    )
  }

  return (
    <div className="h-auto w-full p-6 rounded bg-card-light dark:bg-card">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#Invoice</TableHead>
          <TableHead className="text-center">Client</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">date</TableHead>
          <TableHead className="text-center">Due date</TableHead>
          <TableHead className="text-center">View</TableHead>
          <TableHead className="text-center">Save</TableHead>
          <TableHead className="text-right">Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices?.map((invoice, i) => (
          <TableRow key={i}>
            <TableCell className="font-text font-medium">
              {invoice.invoiceId}
            </TableCell>
            <TableCell className="font-text font-medium text-center">
              {invoice.clientName}
            </TableCell>
            <TableCell className="font-text font-medium text-center">
              {`$${invoice.total}`}
            </TableCell>
            <TableCell className={`font-text font-medium text-center
              ${invoice.status === 'Paid' ? 'text-green-600' : ''}
              ${invoice.status === 'Pending' ? 'text-blue-600' : ''}
              ${invoice.status === 'Unpaid' ? 'text-red-600' : ''}
            `}>
              {invoice.status}
            </TableCell>
            <TableCell className="font-text font-medium text-center">
              {
                format(new Date(invoice.createdAt), 'dd MMM yyyy')
              }
            </TableCell>
            <TableCell className="font-text font-medium text-center">
              {
                invoice?.dueDate
                ? format(new Date(invoice.dueDate), 'dd MMM yyyy')
                : 'N/A'
              }
            </TableCell>
            <TableCell className="text-center">
              <Link href={`/invoices/view-invoice/${invoice.id}`}>
              <button
                className="px-3 py-2 text-white bg-active rounded cursor-pointer"
              >
                <ExternalLink size={18} />
              </button>
              </Link>
            </TableCell>
            <TableCell className="text-center">
              {/* invoice download button component */}
              <InvoicePdfButton invoice={invoice} />
            </TableCell>
            <TableCell className="text-right">
              <button
                onClick={() => handleDelete(invoice.id)}
                disabled={isPending}
                className="px-3 py-2 cursor-pointer rounded bg-stone-300
                dark:bg-stone-700 text-stone-900 dark:text-white
                disabled:bg-stone-200 disabled:dark:bg-stone-800
                disabled:cursor-not-allowed"
              >
                <Trash2 size={18} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
