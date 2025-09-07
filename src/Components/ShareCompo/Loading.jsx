import React from "react";
import { FadeLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-gray-50">
      {/* Spinner */}
      <FadeLoader color="#556b81" height={30} margin={7} radius={4} width={5} />

      {/* Message */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Please wait, we’re preparing your dashboard...
        </h2>
        
        <p className="text-sm text-gray-500 mt-1">
          Loading your account and routes. This won’t take long.
        </p>

      </div>
    </div>
  );
}
