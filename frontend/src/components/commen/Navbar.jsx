"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { RiGovernmentLine } from 'react-icons/ri'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()


    const navLinkClass = (path) => {
        return `font-medium text-[#131313]  relative pb-1 ${pathname === path
                ? "after:content-[''] after:absolute after:transition-all after:duration-300 after:left-0 after:-bottom-1 after:w-full after:h-[3px] after:bg-[#18486B]"
                : ""
            }`
    }
    return (
        <>
        <nav className='w-full flex items-center  bg-[#ffffff]  justify-between px-8 py-4 md:px-24 shadow-md'>
            {/* logo */}
            <div className='flex items-center gap-3'>
                <div className='px-3 py-3 rounded-full bg-[#18486B] ' >
                    <RiGovernmentLine size={25} className=' text-white' />
                </div>
                <div className='flex flex-col '>
                    <span className='text-[#18486B] font-semibold text-[0.8rem] md:text-[1.1rem]'>MCC Delhi</span>
                    <span className='font-medium text-[0.9rem] text-[#90959F]'>Muncipal Corporation of Delhi</span>
                </div>
            </div>
            {/* ul links */}
            <ul className="hidden xl:flex gap-10 p-2 items-center ">
                <li>
                    <Link href="/" className={navLinkClass("/")}>Home</Link>
                </li>
                <li>
                    <Link href="/about" className={navLinkClass("/about")}>About MCC</Link>
                </li>
                <li><Link href="/departments" className={navLinkClass("/departments")}>Departments</Link></li>
                <li><Link href="/contact" className={navLinkClass("/contact")}>Contact</Link></li>
            </ul>
            {/*Login Buttons */}
            <div className=' hidden xl:flex gap-3'>
                <Link href="/auth" className='px-5 text-sm py-2 hover:bg-[#06263D] hover:text-white font-medium border cursor-pointer border-gray-300 rounded-md text-[#06263D]'>
                    Login
                </Link>
                <button className='px-4 py-2 text-sm cursor-pointer font-medium text-white rounded-md bg-[#06263D]'>
                    Register Complaint
                </button>
            </div>
            {/* mobile menu button */}
            <button onClick={()=> setOpen(!open)} className='xl:hidden text-2xl text-[#18486B]'>
                { open ? <HiX /> : <HiMenuAlt3 />}
            </button>
        </nav>
         {/* mobile menu */}
            {
                open && (
                <div className='xl:hidden transition-all duration-300 w-full px-8 py-4 md:px-24 mt-4 flex flex-col gap-4 shadow-md gap bg-white '>
                <ul className='flex flex-col  gap-4'>
                <li>
                    <Link href="/" className="font-medium text-[#131313]  relative pb-1">Home</Link>
                </li>
                 <li>
                    <Link href="/about" className="font-medium text-[#131313]  relative pb-1">About Mcc</Link>
                </li>
                   <li>
                    <Link href="/departments" className="font-medium text-[#131313]  relative pb-1">Departments</Link>
                </li>
                 <li>
                    <Link href="/contact" className="font-medium text-[#131313]  relative pb-1">Contact</Link>
                </li>
             
                </ul>
                 <div className='flex  gap-3'>
                <button className='px-5 text-sm py-2 font-medium border cursor-pointer border-[#06263D] rounded-md text-[#06263D]'>
                    Login
                </button>
                <button className='px-4 py-2 text-sm cursor-pointer font-medium text-white rounded-md bg-[#0A3D62]'>
                    Register Complaint
                </button>
            </div>
            </div>
                )
            }
        </>
    )
}

export default Navbar