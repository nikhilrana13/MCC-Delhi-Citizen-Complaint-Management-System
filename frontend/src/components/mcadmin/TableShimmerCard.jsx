"use client"
const ComplaintsTableShimmer = ({ rows = 2 }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr className="bg-[#E9EEF4]">
            {["ID", "CATEGORY", "AREA", "DATE", "STATUS"].map((_, i) => (
              <th key={i} className="px-4 py-5">
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border border-gray-300">
              <td className="px-4 py-6">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-4">
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-4 text-right">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse ml-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsTableShimmer;
