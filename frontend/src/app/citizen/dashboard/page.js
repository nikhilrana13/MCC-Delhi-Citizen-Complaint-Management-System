"use client"
import axios from 'axios'
import ProfileDropdown from '../../../components/commen/ProfileDropdown'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaClipboardList } from 'react-icons/fa'
import { CgLock } from 'react-icons/cg'
import { BsEye } from 'react-icons/bs'
import { BiCheckCircle } from 'react-icons/bi'
import StatsCards from '../../../components/mcadmin/StatsCards'
import StatsCardShimmer from '../../../components/mcadmin/StatsCardsShimmer'
import ServiceCards from '../../../components/citizen/ServiceCards'
import Link from 'next/link'
import ComplaintDetailCard from '../../../components/citizen/ComplaintDetailCard'
import ComplaintCardShimmer from '../../../components/citizen/ComplaintCardShimmer'


const page = () => {
  const user = useSelector((state)=> state.Auth.user)
  const [loading, setloading] = useState(false);
  const [tableLoading, setTableloading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [statsState, setstatsState] = useState({
      totalcomplaints: 0,
      pending: 0,
      review: 0,
      resolved: 0,
    });
    //  fetch complaints status
      useEffect(() => {
        const fetchComplaintsStats = async () => {
          try {
            setloading(true);
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/citizen/status`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                withCredentials: true,
              }
            );
            if (response.data) {
              const total = response?.data?.data?.total;
              const pending = response?.data?.data?.pending;
              const resolved = response?.data?.data?.resolved;
              const inprogress = response?.data?.data?.inprogress;
              setstatsState((prev) => ({
                ...prev,
                totalcomplaints: total,
                pending: pending,
                resolved: resolved,
                review: inprogress,
              }));
            }
          } catch (error) {
            console.log("failed to fetch complaint status", error);
          } finally {
            setloading(false);
          }
        };
        fetchComplaintsStats();
      }, []);
      // fetch complaints
      useEffect(() => {
        const fetchComplaints = async () => {
          try {
            setTableloading(true);
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/my-complaints`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                withCredentials: true,
              }
            );
            // console.log("response",response.data)
            if (response.data) {
              setComplaints(response?.data?.data?.complaints);
            }
          } catch (error) {
            console.log("failed to fetch complaints", error);
          } finally {
            setTableloading(false)
          }
        };
        fetchComplaints();
      }, []);
      // console.log("complaints", complaints);
      const stats = [
        {
          title: "Total Complaints",
          value: statsState.totalcomplaints || 0,
          icon: FaClipboardList,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          subColor: "text-green-600",
        },
        {
          title: "Pending",
          value: statsState.pending || 0,
          icon: CgLock,
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          subColor: "text-yellow-600",
        },
        {
          title: "In Review",
          value: statsState.review || 0,
          icon: BsEye,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          subColor: "text-gray-400",
        },
        {
          title: "Resolved",
          value: statsState.resolved || 0,
          icon: BiCheckCircle,
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          subColor: "text-green-600",
        },
      ];
      // console.log("complaints",complaints)
  return (
    <div className='flex flex-col '>
    <div className="flex px-4  border-b py-3 bg-white justify-between">
        <div className='flex flex-col gap-1'>
           <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
          Welcome Back, {user?.name || "User"}
        </span>
         <p className='text-[0.8rem] font-medium text-gray-500'>Track your grivences or report a new civic issue today</p>
        </div>
        {/* profile dropdown */}
        <ProfileDropdown user={user} />
    </div>
    <div className="flex flex-col mt-2 px-4  gap-5  py-3 ">
        {/* status cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              {[1, 2, 3, 4].map((_, index) => {
                return <StatsCardShimmer key={index} />;
              })}
            </>
          ) : (
            stats?.map((item, index) => {
              const Icon = item.icon;
              return (
                <StatsCards
                  key={index}
                  title={item.title}
                  iconBg={item.iconBg}
                  iconColor={item.iconColor}
                  value={item.value}
                  Icon={Icon}
                  subColor={item.subColor}
                />
              );
            })
          )}
        </div>
        {/* quick services */}
        <div className='flex flex-col gap-4 '>
           <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">Quick Services</span>
           {/* cards */}
           <ServiceCards />
        </div>
         {/* recent complaints */} 
        <div className='flex flex-col px-4  mt-8  py-3 gap-4'>
          <div className='flex justify-between'>
            <span className='text-[#0A3D62]   text-[1rem] font-semibold'>Recent Complaints</span>
            <Link href="/citizen/complaints" className='text-[#0A3D62]   text-[0.8rem] font-semibold'>View all history</Link>
          </div>
          <div className='flex flex-col gap-4'>
             {
               tableLoading ? (
                <>
                 {[0,1,2].map((_,index)=>{
                  return <ComplaintCardShimmer key={index} />
                 })}
                </>
               ):complaints?.length > 0 ? (
                 <>
                  {complaints?.slice(0,3)?.map((complaint)=>{
                    return (
                      <ComplaintDetailCard key={complaint._id} complaint={complaint} />
                    )
                  })}
                 </>
               ):(
                   <div className="py-10 text-center text-gray-400">
                   No complaints found
                   </div>
               )
             }
          </div>
       </div>
    </div>
    
    </div>
  )
}

export default page