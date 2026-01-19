import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../redux/AuthSlice'
import socket from '../config/socket'
import axios from 'axios'
import { addNotification, MarkedAllread } from '../redux/NotificationSlice'
import { persistor } from '../redux/Store'

const useLogout = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = async()=>{
          try { 
              const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,{
                headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`
                },withCredentials:true
              })
              if(response.data){
                toast.success(response?.data?.message)
                localStorage.removeItem("token")
                dispatch(SetUser(null))
                dispatch(addNotification(null))
                dispatch(MarkedAllread())
                // clear persisted notification data
                persistor.purge()
                if(socket?.connected){
                  socket.disconnect()
                }
                router.replace("/")
              }        
          } catch (error) {
            console.log("failed to logout",error)
            return toast.error(error?.response?.data?.message || 'Internal server error')
          }
      } 
  return {handleLogout}
}

export default useLogout