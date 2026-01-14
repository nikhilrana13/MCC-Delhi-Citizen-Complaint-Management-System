"use client";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/commen/Sidebar";
import React, { useEffect } from "react";
import socket from "../../config/socket";
import toast from "react-hot-toast";
import { addNotification } from "../../redux/NotificationSlice";

const Mclayout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  // console.log("userid",user.id)
 
  useEffect(() => {
    if (!socket || !user?.id) return;
    // if already connected (reload case)
    if (socket.connected) {
    //   console.log("already connected → joining room");
      socket.emit("join", user.id);
    }
    // future connects (first load / reconnect)
    const handleConnect = () => {
    //   console.log("socket connected:", socket.id);
    //   console.log("joining room:", user.id);
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

  return (
    <div className="w-full flex  min-h-screen flex-col agp-1 md:flex-row ">
      {/* left side */}
      <div className="w-full md:w-[20%]">
        <Sidebar />
      </div>
      {/* right side  */}
      <div className="w-full md:w-[80%] bg-[#F5F7FA] h-screen overflow-y-auto  flex flex-col ">
        {children}
      </div>
    </div>
  );
};

export default Mclayout;
