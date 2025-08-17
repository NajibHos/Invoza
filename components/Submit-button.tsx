'use client';

import { useFormStatus } from "react-dom";

export default function SubmitButton() {

  const { pending } = useFormStatus();

  return (
    <div className="h-auto w-full mt-2">
      <button
        type="submit"
        disabled={pending}
        className="w-full py-2 text-base font-text font-medium
        text-white bg-blue-600 disabled:bg-blue-500
        rounded cursor-pointer"
      >
        {pending ? 'Submitting' : 'Submit'}
      </button>
    </div>
  )
}