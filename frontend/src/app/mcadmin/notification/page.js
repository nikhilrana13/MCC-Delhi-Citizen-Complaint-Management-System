"use client"
import axios from 'axios'
import ProfileDropdown from '../../../components/commen/ProfileDropdown'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotificationShimmer from '../../../components/commen/NotificationShimmer'
import { timeAgo } from '../../../components/commen/Helpers'
import toast from 'react-hot-toast'
import { MarkedAllread } from '../../../redux/NotificationSlice'

const page = () => {
  const user = useSelector((state)=>state.Auth.user)
  const [notifcations,setNotifications] = useState([])
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  // fetch notifications
  useEffect(()=>{
        const fetchNotifications = async()=>{
          try {
              setLoading(true)
              const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notification/mc-notifications`,{
                headers:{
                  Authorization:`Bearer ${localStorage.getItem("token")}`
                },withCredentials:true
              })
              // console.log("response",response)
              if(response.data){
                setNotifications(response?.data?.data)
              }
          } catch (error) {
            console.log("failed to get notifications",error)
          }finally{
           setLoading(false)
            
          }
        }
        fetchNotifications()
  },[])
  // handle mark read notifications
   const MarkreadNotification = async()=>{
   const token = localStorage.getItem("token");
          if (!token) {
             toast.error("Session expired, please login again");
           return;
        }
      try { 
          const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notification/mcmarkedread`,{},{
            headers:{
              Authorization:`Bearer ${token}`
            },
          })
          if(response.data){
             toast.success(response?.data?.message)
             setNotifications((prev)=> prev.map((n)=>({...n,isRead:true}) ))
             dispatch(MarkedAllread())
          }
      } catch (error) {
        console.log("failed to marked read",error)
        toast.error(error?.response?.data?.message || "Internal server error")
      }
   }
   
  return (
    <>
      <div className="flex px-4 items-center py-3 bg-white justify-between">
        <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
          Notifcations
        </span>
        {/* profile dropdown */}
        <ProfileDropdown user={user} />
      </div>
      <div className='flex px-4 md:px-20 sm:justify-center py-3 '>
          <div className='bg-white w-full md:w-[700px]   flex border rounded-md flex-col'>
            <div className='flex border-b py-3 px-3 flex-col gap-2  sm:items-center sm:flex-row justify-between'>
              <div className='flex gap-2'>
                <div className='flex items-center gap-1'>
                 <span className='text-[0.8rem] font-semibold text-[#0A3D62]'>All notifcations</span>
                 <span className='text-[0.6rem] bg-[#F5F7FA] text-[#0A3D62] font-semibold border px-1  rounded-full '>{notifcations?.length || 0}</span>
              </div>
              </div>
              {/* mark all read button */}
              <div>
                   <button  disabled={!notifcations.some(n => !n.isRead)} onClick={()=> MarkreadNotification()} className='border bg-[#0A3D62] text-[1rem] cursor-pointer rounded-md text-white  disabled:opacity-50 px-5 py-1'>Mark all read</button>
              </div>
            </div>
            {/* notifications */}
            {
              loading ? (
                <NotificationShimmer />
              ):notifcations?.length > 0 ? (
                <div className='flex flex-col   overflow-y-auto  h-[70vh] '>
                  {notifcations?.map((notification)=>{
                    return (
                      <div key={notification?._id} className={`flex flex-col  ${notification?.isRead === true ? "bg-white":"bg-[#F0F7FF]"} border-b  py-7 px-3  gap-1`}>
                    <div className='flex w-full  justify-between'>
                        <span className='text-[#0A3D62]   text-[0.9rem] font-semibold '>{notification?.title || "NA"}</span>
                       <span className='text-[0.8rem] text-gray-500'>{timeAgo(notification?.createdAt) || new Date().toLocaleDateString()}</span>        
                 </div>
                   <p className='text-gray-500 text-[0.8rem]'>{notification.message || "NA"}</p>
               </div> 
                    )
                })}
                </div>
              ):(
                <p className="py-10 text-center text-[#0A3D62]">
                      No notifications found
                </p>
              )
            }
          </div>
      </div>
    </>
  )
}

export default page