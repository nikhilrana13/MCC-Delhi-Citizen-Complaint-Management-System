"use client"
import ComplaintCardShimmer from '../../../components/citizen/ComplaintCardShimmer'
import ComplaintDetailCard from '../../../components/citizen/ComplaintDetailCard'
import axios from 'axios'
import { PlusIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const page = () => {
   const [Complaints,setComplaints] = useState([])
   const [loading,setloading] = useState(false)
   const [status,setStatus] = useState("all")

   const handleStatusChange = (value)=>{
      setStatus(value)
   }
     useEffect(() => {
       const fetchComplaints = async () => {
         try {
           setloading(true);
           const response = await axios.get(
             `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/complaint/my-complaints`,
             {
               params: {
                 status: status,
               },
               headers: {
                 Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
               withCredentials: true,
             }
           );
          //  console.log("response", response.data);
           if (response.data) {
             setComplaints(response?.data?.data?.complaints);
           }
         } catch (error) {
           console.log("failed to fetch complaints", error);
         } finally {
          setloading(false)
         }
       };
       fetchComplaints();
     }, [status]);
  return (
    <>
    <div className="flex px-4 md:items-center gap-5 border-b py-3 flex-col bg-white sm:flex-row sm:justify-between">
           <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
            My complaints
        </span>
        <div>
          <button className='border flex gap-1 bg-[#0A3D62] text-[1rem] cursor-pointer rounded-md text-white  disabled:opacity-50 px-5 py-2'> <PlusIcon size={24} /> New Complaint</button>
        </div>
    </div>
    <div className="flex px-4 py-3  flex-col gap-3 md:gap-5">
      <div className="flex flex-col gap-3 py-4 md:flex-row md:justify-between">
        <div className='flex  p-1 bg-[#E9EEF2] rounded-md  overflow-x-auto no-scrollbar gap-3'>
          <span onClick={()=>handleStatusChange("all")} className={`${status === "all" ? "bg-white text-[#0A3D62]":"text-[#AAB0B9]"} rounded-md cursor-pointer text-center  px-5 py-2 font-semibold sm:text-[0.9rem]`}>All</span>
          <span  onClick={()=>handleStatusChange("pending")} className={`rounded-md cursor-pointer ${status === "pending" ? "bg-white text-[#0A3D62]":"text-[#AAB0B9]"}  px-5 py-2 font-semibold text-[0.9rem]`}>Pending</span>
           <span  onClick={()=>handleStatusChange("progress")} className={`rounded-md ${status === "progress" ? "bg-white text-[#0A3D62]":"text-[#AAB0B9]"}  cursor-pointer  px-5 py-2 font-semibold text-[0.9rem] `}>Progress</span>
            <span  onClick={()=>handleStatusChange("completed")} className={`${status === "completed" ? "bg-white text-[#0A3D62]":"text-[#AAB0B9]"} rounded-md cursor-pointer  px-5 py-2 font-semibold text-[0.9rem]`}>
              Resolved
            </span>
        </div>
      </div>
      {/* complaints */}
      <div className=" gap-3 flex flex-col rounded-md w-full no-scrollbar overflow-y-auto h-[70vh]">
            {
               loading ? (
                <>
                 {[0,1,2,3,4,].map((_,index)=>{
                  return <ComplaintCardShimmer key={index} />
                 })}
                </>
               ):Complaints?.length > 0 ? (
                 <>
                  {Complaints?.map((complaint)=>{
                    return (
                      <ComplaintDetailCard key={complaint?._id} complaint={complaint} />
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
    </>
  )
}

export default page