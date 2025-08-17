'use client';

import { UpdateStatus } from "@/actions/invoice-action";
import { useTransition } from "react";
import { toast } from "sonner";

export default function InvoiceUpdateButton({ id }: {id: string | undefined}) {

  const [isPending, startTransition] = useTransition();

  function statusUpdate(id: string | undefined, status: string) {
    startTransition(async () => {
      const res = await UpdateStatus(id, status);

      if (res?.res && res?.res === 'Failed') {
        console.error(res?.error);
        toast.error('Error updating status');
      } else {
        toast.success('status has been updated');
      }
    });
  };

  return (
    // <div className="h-auto w-full flex justify-between lg:justify-start
    //   items-center gap-0 lg:gap-8"
    // >
    //   <div className="h-auto w-[45%] lg:w-auto">
    //     {
    //       status === 'Paid' && <button
    //         onClick={() => Pending(id, 'Pending')}
    //         className="w-full lg:w-auto px-0 lg:px-6 py-2 text-base font-text
    //         font-medium text-white bg-blue-600 rounded cursor-pointer"
    //       >
    //         Mark as Pending
    //       </button>
    //     }
    //     {
    //       status === 'Pending' && <button
    //         onClick={() => Paid(id, 'Paid')}
    //         className="w-full lg:w-auto px-0 lg:px-6 py-2 text-base font-text
    //         font-medium text-white bg-green-600 rounded cursor-pointer"
    //       >
    //         Mark as Paid
    //       </button>
    //     }
    //     {
    //       status === 'Pending' && <button
    //         onClick={() => Paid(id, 'Paid')}
    //         className="w-full lg:w-auto px-0 lg:px-6 py-2 text-base font-text
    //         font-medium text-white bg-green-600 rounded cursor-pointer"
    //       >
    //         Mark as Paid
    //       </button>
    //     }
    //   </div>
    //   <div className="h-auto w-[45%] lg:w-auto">
    //     <button
    //       className="w-full lg:w-auto px-0 lg:px-6 py-2 text-base font-text
    //       font-medium text-white bg-blue-700 rounded cursor-pointer"
    //     >
    //       Download
    //     </button>
    //   </div>
    // </div>
    <div className="h-auto w-full flex flex-col justify-center items-center
      gap-3"
    >
      <div className="h-auto w-full text-left">
        <h2 className="text-base font-text font-medium text-stone-800
          dark:text-stone-300"
        >
          Mark invoice as
        </h2>
      </div>
      <div className="h-auto w-full flex justify-start items-center gap-5">
        <div className="h-auto w-auto">
          <button
            onClick={() => statusUpdate(id, 'Pending')}
            disabled={isPending}
            className="w-auto px-6 py-2 text-base font-text
            font-medium rounded cursor-pointer text-white bg-blue-600
            disabled:bg-blue-500"
          >
            Pending
          </button>
        </div>
        <div className="h-auto w-auto">
          <button
            onClick={() => statusUpdate(id, 'Paid')}
            disabled={isPending}
            className="w-auto px-6 py-2 text-base font-text
            font-medium rounded cursor-pointer text-white bg-green-600
            disabled:bg-green-500"
          >
            Paid
          </button>
        </div>
        <div className="h-auto w-auto">
          <button
            onClick={() => statusUpdate(id, 'Unpaid')}
            disabled={isPending}
            className="w-auto px-6 py-2 text-base font-text
            font-medium rounded cursor-pointer text-white bg-red-600
            disabled:bg-red-500"
          >
            Unpaid
          </button>
        </div>
      </div>
    </div>
  )
}