"use client"
import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "garbage", value: 300 },
  { name: "Roads", value: 450 },
  { name: "Water", value: 200 },
  { name: "Electricity", value: 150 },
  { name: "other", value: 250 },
  { name: "Parks", value: 180 },
  {name:"streetlights",value: 180 }
];
const ComplaintsByCategory = () => {
  return (
     <div className="bg-white w-full md:w-[60%] p-6 rounded-xl ">
      <div className="flex items-center gap-3 justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#0A3D62]">
          Complaints by Category
        </h3>

        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ComplaintsByCategory