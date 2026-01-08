"use client";

const ChartsShimmer = () => {
  return (
    <div className="flex w-full gap-3 mt-10 flex-col md:flex-row">
      
      {/* Left chart shimmer */}
      <div className="flex-1 bg-white rounded-xl  p-6 animate-pulse">
        <div className="flex justify-between mb-4">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>

        <div className="h-64 bg-gray-100 rounded-lg" />
      </div>

      {/* Right donut shimmer */}
      <div className="w-full md:w-95 bg-white rounded-xl  p-6 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 rounded mb-4" />

        <div className="h-64 bg-gray-100 rounded-full mx-auto w-64" />

        <div className="flex justify-center gap-4 mt-6">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <div className="h-3 w-14 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartsShimmer;
