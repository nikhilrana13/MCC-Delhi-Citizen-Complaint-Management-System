"use client"
import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const StatusDonet = ({statusDonetdata,total}) => {
      const data = statusDonetdata
  return (
    <div className="bg-white p-6 w-full md:w-[40%]  rounded-xl ">
      <h3 className="text-sm font-semibold text-[#0A3D62] mb-4">
        Status Overview
      </h3>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-gray-900">
            {total / 1000}
          </p>
          <p className="text-sm text-gray-400">Total</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        {statusDonetdata.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-500">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatusDonet