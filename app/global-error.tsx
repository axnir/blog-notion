'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-[50vh] mt-[80px] flex flex-col items-center justify-center">
      <h2 className="mb-5 text-violet11 text-xl font-semibold">
        Oops, Something went wrong!
      </h2>
      <button
        className="text-violet11 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        onClick={() => reset()}
      >
        重试
      </button>
    </div>
  );
}
