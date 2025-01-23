import React from "react";

/**
 * Spinner component to indicate loading state
 * @returns A spinner element
 */
export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="w-10 h-10 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin"
      ></div>
    </div>
  );
};