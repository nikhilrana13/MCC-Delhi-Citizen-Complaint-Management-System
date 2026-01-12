"use client"
import ProfileDropdown from '@/src/components/commen/ProfileDropdown'
import { SetUser } from '@/src/redux/AuthSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
  const user = useSelector((state)=> state.Auth.user)
  const dispatch = useDispatch()
  const [input,setInput] = useState({})
  const [error,setError] = useState("")
  const [ImagePreview,setImagePreview] = useState(null)
  const [loading,setloading] = useState(false)

  useEffect(()=>{
    if(user){
       setInput({
        name:user.name || "",
        profilepic:user.profilepic || null})
       setImagePreview(user.profilepic && user.profilepic.trim() !== "" ? user.profilepic : null)
    }
  },[user])

   const handleInputChange = (e)=>{
      const {name,value,files} = e.target 
      if(name === "profilepic"){
        const file = files[0]
        setInput((prev)=> ({...prev,profilepic:file}))
        if(file) setImagePreview(URL.createObjectURL(file))
      }else{
         setInput((prev)=>({...prev,[name]:value}))
         setError("")
       }
       
   }
  const getProfileImage = (profilepic) => {
  if (!profilepic || profilepic.trim() === "") {
    return "/unknownuser.webp"; 
  }
  return profilepic;
  };

   const handleUpdateProfile = async()=>{
       if(!input.name ||!input.name.trim()){
         setError("Name is Required")
         return ;
       }
       let formdata = new FormData()
        formdata.append("Mcname",input.name)
        if(input.profilepic instanceof File){
          formdata.append("profilepic",input.profilepic)
        }
        // for(let pair of formdata.entries()){
        //   console.log(pair[0], pair[1] )
        // }
        try {
          setloading(true)
           const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mcadmin/updateprofile`,formdata,{
             headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
             }
           })
          //  console.log("response",response.data)
           if(response.data){
            toast.success(response?.data?.message)
            dispatch(SetUser(response?.data.data?.user))
           }
        } catch (error) {
          console.log("failed to update profile",error)
          toast.error(error?.response?.data?.message || "Internal server error")
        }finally{
          setloading(false)
        }
   }
  return (
    <>
    <div className="flex px-4 items-center py-3 bg-white justify-between">
        <span className="text-[#0A3D62]   text-[1.2rem] font-semibold ">
          Settings
        </span>
        {/* profile dropdown */}
        <ProfileDropdown user={user} />
      </div>
      <div className='flex justify-center mt-10 items-center'>
        <div className='border w-full md:w-[600px] px-4 py-3 bg-white rounded-md flex flex-col gap-3'>
          <div className='flex flex-col border-b py-3 gap-1'>
            <span className='text-[#0A3D62] text-[1rem] font-semibold '>Profile Information</span>
            <p className='text-[0.8rem] font-semibold text-gray-500'>Update your photo and Name here</p>
          </div>
          <div className='flex  py-2 flex-col gap-4'>
            <div className=' w-full items-center flex gap-4'>
              {/* image preview */}
             
                 <div className="w-[100px] h-[100px] rounded-full overflow-hidden border">
                    <img
                      src={ImagePreview || getProfileImage(user?.profilepic)}
                      alt="Profile image"
                       onError={(e) => {
                             e.currentTarget.src = "/unknownuser.webp";
                             }}
                      className="w-full h-full object-cover"
                    />
                </div>
              <div>
             <label htmlFor='selectimage' className='border text-[#0A3D62] font-semibold cursor-pointer px-3 py-2 border-gray-300 rounded-md text-[0.8rem]'>Change photo</label>
             <input onChange={handleInputChange} type='file' accept='image/*' id='selectimage' className='hidden' name="profilepic" /> 
              </div>
            </div>
             <div className='flex flex-col gap-1 py-1'>
               <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-sm font-medium text-[#333]"
                />
                  {error && (
                        <p className='text-red-500 text-[0.8rem]'>Name is Required</p>
                 )}
             </div>
           
              <div className='flex justify-end'>
                <button onClick={()=>handleUpdateProfile()} className='bg-[#0A3D62] px-3 py-2 text-[0.8rem] cursor-pointer rounded-md text-white'>
                  {loading ? <Loader2 className='animate-spin w-4 h-5 mx-auto' />:"Save Changes"}
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page