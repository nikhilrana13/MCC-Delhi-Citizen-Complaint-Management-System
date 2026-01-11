"use client"
import React from 'react'
import { getFCMToken } from '../config/firebase'
import axios from "axios"

const useAfterAuthSuccess = () => {
    const afterAuthSuccess = async(userId)=>{
        try {
            // console.log("userid",userId)
            // get fcm token
            const token = await getFCMToken()
            // console.log("fcm token",token)
            if(token){
                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notification/save-token`,{token},{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },withCredentials:true
                }) 
            }  
        } catch (error) {
            console.error("After Auth success hook failed",error)
        }
    }

  return {afterAuthSuccess}
}

export default useAfterAuthSuccess