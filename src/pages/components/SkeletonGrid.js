import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-36 bg-gray-200">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>

        {/* Pages badge skeleton */}
        <div className="absolute top-2 right-2 bg-gray-300 rounded px-3 py-1">
          <div className="w-12 h-3 bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="mb-2">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-1"></div>
        </div>

        {/* Created date skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonGrid = () => {
  return (
    <div className="p-6  h-full w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SkeletonGrid;
