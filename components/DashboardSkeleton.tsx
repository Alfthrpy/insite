import React from "react";

const DashboardSkeleton: React.FC = () => {
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
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-6 animate-pulse"></div>

        {/* Undangan Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Undangan Card */}
          <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>

          {/* Template Preview */}
          <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            <div className="h-48 bg-gray-300 rounded mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>
      </main>
    </div>
  );
};

export default DashboardSkeleton;
