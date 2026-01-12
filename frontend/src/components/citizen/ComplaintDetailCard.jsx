import React from 'react'

const ComplaintDetailCard = () => {
  return (
    <div className='w-full px-7 py-4 items-center rounded-md flex flex-col border border-gray-300 md:flex-row sm:justify-between bg-white'>
        <div className='flex flex-col gap-2'>
            <span className='text-[0.9rem] text-[#77859A] font-medium'>#CMP-2024-841</span>
            <span className='text-[1rem] text-[#1A334C] font-medium'>Overflowing garbage near park</span>
            <span className='text-[0.9rem] text-[#77859A] font-medium'>Garbage | 2 Days ago | Rohini,Delhi</span>
        </div>
        <div>
            <button className="px-3 py-2 bg-green-100 text-green-600  rounded-full text-xs font-semibold">Completed</button>
        </div>
    </div>
  )
}

export default ComplaintDetailCard