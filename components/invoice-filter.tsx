'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function InvoiceFilter() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilters(status: string) {
    startTransition(async () => {
      const params = new URLSearchParams(searchParams);
      params.set('status', status);
      router.push(`?${params.toString()}`);
    })
  }

  function resetFilters() {
    router.push(window.location.pathname); // remove all search params
  }

  return (
    <div className="h-auto w-full flex justify-start items-center gap-4 lg:gap-8
      overflow-x-auto"
    >
      <div className="h-auto w-auto">
        <button
          onClick={() => handleFilters('Paid')}
          disabled={isPending}
          className="w-auto px-6 py-2 text-base font-text font-medium
          rounded cursor-pointer  text-green-600 disabled:text-green-500
          bg-card-light dark:bg-card"
        >
          Paid
        </button>
      </div>
      <div className="h-auto w-auto">
        <button
          onClick={() => handleFilters('Pending')}
          disabled={isPending}
          className="w-auto px-6 py-2 text-base font-text font-medium
          rounded cursor-pointer  text-blue-600 disabled:text-blue-500
          bg-card-light dark:bg-card"
        >
          Pending
        </button>
      </div>
      <div className="h-auto w-auto">
        <button
          onClick={() => handleFilters('Unpaid')}
          disabled={isPending}
          className="w-auto px-6 py-2 text-base font-text font-medium
          rounded cursor-pointer text-red-600 disabled:text-red-500
          bg-card-light dark:bg-card"
        >
          Unpaid
        </button>
      </div>
      <div className="h-auto w-auto">
        <button
          onClick={resetFilters}
          className="w-auto px-6 py-2 text-base font-text font-medium
          text-stone-900 dark:text-white bg-card-light dark:bg-card
          rounded cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  )
}