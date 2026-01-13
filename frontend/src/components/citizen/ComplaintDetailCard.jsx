import React from 'react'
import { timeAgo } from '../commen/Helpers'

const ComplaintDetailCard = ({complaint}) => {
  return (
    <div className='w-full px-7 py-4 items-center rounded-md flex flex-col border border-gray-300 md:flex-row sm:justify-between bg-white'>
        <div className='flex flex-col gap-2'>
            <span className='text-[0.9rem] text-[#77859A] font-medium'>#CMP-{complaint?._id?.slice(0,7) || "NA"}</span>
            <span className='text-[1rem] text-[#1A334C] font-medium'>{complaint?.title || "NA"}</span>
            <span className='text-[0.9rem] text-[#77859A] font-medium'>{complaint?.category || "NA"} | {timeAgo(complaint?.createdAt) || new Date().toDateString()} | {complaint?.address?.map((add)=> add.location) || "NA"}</span>
        </div>
        <div>
            <button className={`px-3 py-2 ${
                    complaint?.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : complaint?.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  } rounded-full text-xs font-semibold`}>{complaint?.status || "NA"}</button>
        </div>
    </div>
  )
}

export default ComplaintDetailCard