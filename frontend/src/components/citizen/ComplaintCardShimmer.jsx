import React from 'react'

const ComplaintCardShimmer = () => {
  return (
     <div className="w-full px-7 py-4 rounded-md flex flex-col items-center md:flex-row sm:justify-between bg-white border border-gray-200 animate-pulse">
      {/* Left content */}
      <div className="flex flex-col gap-2 w-full">
        {/* Complaint ID */}
        <div className="h-4 w-32 bg-gray-200 rounded"></div>

        {/* Title */}
        <div className="h-5 w-64 bg-gray-300 rounded"></div>

        {/* Meta info */}
        <div className="h-4 w-full md:w-96 bg-gray-200 rounded"></div>
      </div>
      {/* Status Button */}
      <div className="mt-4 md:mt-0">
        <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  )
}

export default ComplaintCardShimmer