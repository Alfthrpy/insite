import React from "react";

const InvitationSkeleton: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Skeleton */}
      <aside className="w-1/5 bg-gray-200 animate-pulse h-full p-4">
        <div className="h-10 bg-gray-300 rounded mb-4"></div>
        <div className="h-8 bg-gray-300 rounded mb-4"></div>
        <div className="h-8 bg-gray-300 rounded"></div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-8">
        {/* Header Skeleton */}
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>

        {/* Card Undangan Skeleton */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md animate-pulse mb-6">
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/6"></div>
        </div>

        {/* Buttons Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="h-16 bg-gray-300 rounded"></div>
          <div className="h-16 bg-gray-300 rounded"></div>
          <div className="h-16 bg-gray-300 rounded"></div>
          <div className="h-16 bg-gray-300 rounded"></div>
          <div className="h-16 bg-gray-300 rounded"></div>
          <div className="h-16 bg-gray-300 rounded"></div>
        </div>
      </main>
    </div>
  );
};

export default InvitationSkeleton;
