'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { ExternalLink } from "lucide-react"
import Link from "next/link";
import Alert from "./Alert";
import InvoicePdfButton from "./invoice-pdf";

type InvoiceType = [
  {
    id: string;
    invoiceId: string;
    status: string;
    createdAt: Date;
    dueDate: Date;
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
  }
]

export default function InvoiceTable({ data }: {data: InvoiceType}) {

  if (data?.length < 1) {
    return (
      <div className="h-auto w-full p-6 rounded bg-white dark:bg-card">
        <Alert />
      </div>
    )
  }

  return (
    <div className="h-auto w-full rounded bg-white dark:bg-card">
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
          <TableHead className="text-right">Save</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((invoice, i) => (
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
                format(new Date(invoice.dueDate), 'dd MMM yyyy')
              }
            </TableCell>
            <TableCell className="text-center">
              <Link href={`/invoices/view-invoice/${invoice.id}`}>
              <button
                className="px-3 py-2 text-white bg-active rounded
                cursor-pointer"
              >
                <ExternalLink size={18} />
              </button>
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <InvoicePdfButton invoice={invoice} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}
