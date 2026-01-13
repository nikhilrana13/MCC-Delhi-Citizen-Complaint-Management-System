"use client"
import useLogout from '../../hooks/useLogout'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { IoIosNotifications, IoIosSettings } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { LuLayoutDashboard } from 'react-icons/lu'
import { RiGovernmentLine } from 'react-icons/ri'
import { TbNotes } from 'react-icons/tb'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const pathname = usePathname()
  const { handleLogout } = useLogout()
  const unreadCount = useSelector((state)=> state.notification.unReadCount)
  const user = useSelector((state)=> state.Auth.user)

  const navlink = (path) => {
    return `${pathname === path ? "bg-[#0A3D62] text-white px-3 py-3  rounded-md  flex items-center gap-2" : "px-3 py-3  hover:text-[#0A3D62] text-[#707785] hover:bg-[#E9EEF2] rounded-md "}`
  }
  return (
    <div className='flex flex-col min-h-screen   bg-[#F0F4F8]'>
      <div className='flex items-center border-b border-gray-300 py-3 px-4 gap-3'>
        <div className='px-3 py-3 rounded-full bg-[#18486B] ' >
          <RiGovernmentLine size={25} className=' text-white' />
        </div>
        <span className='text-[#18486B] font-semibold text-[0.8rem] md:text-[1.1rem]'>MCC Delhi</span>
      </div>
      <div className='flex flex-col pt-8 px-4  gap-5'>
        <Link  href={` ${user?.role === "mc" ? '/mcadmin/dashboard' : '/citizen/dashboard' }`}  
        className={`${user?.role === "mc" ? navlink("/mcadmin/dashboard"): navlink("/citizen/dashboard") }`}>
          <div className="flex items-center gap-4">
            <LuLayoutDashboard size={25} />
            <span className="transition-opacity font-medium duration-500">Dashboard</span>
          </div>
        </Link>
        <Link href={` ${user?.role === "mc" ? '/mcadmin/complaints' : '/citizen/complaints' }`}  className={`${user?.role === "mc" ? navlink("/mcadmin/complaints"): navlink("/citizen/complaints") }`}  >
          <div className="flex items-center gap-4">
            <TbNotes size={25} />
            <span className="transition-opacity font-medium duration-500">Complaints</span>
          </div>
        </Link>
        <Link  href={` ${user?.role === "mc" ? '/mcadmin/notification' : '/citizen/notification' }`} className={`${user?.role === "mc" ? navlink("/mcadmin/notification"): navlink("/citizen/notification") }`} >
          <div className="flex items-center relative gap-4">
            <IoIosNotifications size={25} />
            {unreadCount > 0 && (
              <span className="absolute top-0 left-4 bg-red-500 text-white text-[10px] px-1 rounded-full">
                {unreadCount}
              </span>
            )}
            <span className="transition-opacity font-medium duration-500">Notifications</span>
          </div>
        </Link>
        <Link href={` ${user?.role === "mc" ? '/mcadmin/settings' : '/citizen/settings' }`} className={`${user?.role === "mc" ? navlink("/mcadmin/settings"): navlink("/citizen/settings") }`} >
          <div className="flex items-center gap-4">
            <IoIosSettings size={25} />
            <span className="transition-opacity font-medium duration-500">Settings</span>
          </div>
        </Link>
      </div>
      <div className='border-t  border-gray-300 px-6 cursor-pointer py-5 md:mt-65'>
        <span onClick={handleLogout} className='flex hover:text-[#0A3D62] rounded-md cursor-pointer px-3 py-3 text-[#707785] hover:bg-[#E9EEF2] gap-2'>
          <IoLogOut size={25} />
          <span className='text-'>Logout</span>
        </span>
      </div>
    </div>
  )
}

export default Sidebar