'use client';

import { format } from "date-fns";
import jsPDF from "jspdf";
import { Download } from "lucide-react";

export default function InvoicePdfButton({ invoice }: { invoice: any }) {

  function handleDownload() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Title
    pdf.setFontSize(22);
    pdf.text("INVOICE", 105, 20, { align: "center" });

    // Invoice Info
    pdf.setFontSize(12);
    pdf.text(`#Invoice id: ${invoice?.invoiceId || ""}`, 20, 35);
    pdf.text(`Status: ${invoice?.status || ""}`, 160, 35);

    // Dates
    pdf.text(
      `Issue date: ${invoice?.createdAt ? format(new Date(invoice?.createdAt),
       'dd MMM yyyy') : ""}`,
      20,
      45
    );
    pdf.text(
      `Due date: ${invoice?.dueDate ? format(new Date(invoice?.dueDate),
       'dd MMM yyyy') : ""}`,
      160,
      45
    );

    // Bill From
    pdf.setFontSize(14);
    pdf.text("Bill from:", 20, 60);
    pdf.setFontSize(12);
    pdf.text(`${invoice?.billerName || ""}`, 20, 67);
    pdf.text(`${invoice?.billerEmail || ""}`, 20, 74);
    pdf.text(`${invoice?.billerAddress || ""}`, 20, 81);

    // Bill To
    pdf.setFontSize(14);
    pdf.text("Bill to:", 120, 60);
    pdf.setFontSize(12);
    pdf.text(`${invoice?.clientName || ""}`, 120, 67);
    pdf.text(`${invoice?.clientEmail || ""}`, 120, 74);
    pdf.text(`${invoice?.clientAddress || ""}`, 120, 81);

    // table section
    // table header
    pdf.setFontSize(14);
    pdf.text('Description', 20, 100);
    pdf.text('Price', 110, 100);
    pdf.text('Quantity', 140, 100);
    pdf.text('Total', 170, 100);

    // draw header line
    pdf.line(20, 102, 190, 102);

    // item details
    pdf.text(`${invoice?.description || ""}`, 20, 110);
    pdf.text(`$${Number(invoice?.price) || 0}`, 110, 110);
    pdf.text(`${invoice?.quantity || ""}`, 140, 110);
    pdf.text(`$${Number(invoice?.total) || 0}`, 170, 110);

    // total section
    pdf.line(20, 115, 190, 115);
    pdf.text('Total(USD):', 140, 130);
    pdf.text(`$${Number(invoice?.total) || 0}`, 170, 130);

    // save pdf
    pdf.save('invoice.pdf');
  }

  return (
    <button
      onClick={handleDownload}
      className="px-3 py-2 text-white bg-active rounded cursor-pointer"
    >
      <Download size={18} />
    </button>
  );

}