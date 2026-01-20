"use client"
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/commen/Sidebar'
import React, { useEffect, useState } from 'react'
import { addNotification } from '../../redux/NotificationSlice';
import toast from 'react-hot-toast';
import socket from '../../config/socket';
import { useRouter } from 'next/navigation';
import AuthLoader from '../../components/loaders/AuthLoader';


const Citizenlayout = ({children}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const router = useRouter()
  const [checkingAuth,setCheckingAuth] = useState(true)
  // console.log("userid",user.id)

  useEffect(()=>{    
    const token = localStorage.getItem("token")
  if(!token || user?.role !== "citizen"){
    router.replace("/auth")
  }else{
    setCheckingAuth(false)
  }
  },[user])
 
  useEffect(() => {
    if (!socket || !user?.id) return;
    // if already connected (reload case)
    if (socket.connected) {
      // console.log("already connected → joining room");
      socket.emit("join", user.id);
    }
    // future connects (first load / reconnect)
    const handleConnect = () => {
      // console.log("socket connected:", socket.id);
      // console.log("joining room:", user.id);
      socket.emit("join", user.id);
    };
    const handleNotification = (data) => {
        // console.log("notification data",data)
      toast.success(data.title);
      dispatch(addNotification(data));
    };
    socket.on("connect", handleConnect);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
    };
  }, [user]);

  // BLOCK UI until auth check finishes
  if(checkingAuth){
     return (
        <AuthLoader />
     )
  }
  return (
    <div className='w-full min-h-screen flex flex-col agp-1 md:flex-row '>
        {/* left side */}
        <div className='w-full md:w-[20%] '>
            <Sidebar />
        </div>
        {/* right side  */}
        <div className='w-full md:w-[80%] flex bg-[#F5F7FA]  h-screen overflow-y-auto flex-col border'>
            {children}
        </div>
    </div>
  )
}

export default Citizenlayout