"use client"
import ProfileDropdown from '../../../components/commen/ProfileDropdown'
import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {
  const user = useSelector((state)=>state.Auth.user) 

  return (
    <>
     <div className="flex px-4 items-center py-3 bg-white justify-between">
        <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
          Complaints Management
        </span>
        {/* profile dropdown */}
        <ProfileDropdown user={user} />
      </div>
      <div className='flex flex-col gap-3'>
        
      </div>


    </>
  )
}

export default page