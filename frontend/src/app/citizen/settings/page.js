"use client"
import axios from 'axios';
import ProfileDropdown from '../../../components/commen/ProfileDropdown';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../../../redux/AuthSlice';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const page = () => {
   const user = useSelector((state)=> state.Auth.user)
  const dispatch = useDispatch()
  const [input,setInput] = useState({
  name: "",
  email: "",
  phonesuffix: "",
  phonenumber: "",
  address: "",
  profilepic: null
  })
  const [errors,setErrors] = useState({})
  const [ImagePreview,setImagePreview] = useState(null)
  const [loading,setloading] = useState(false)
  const [passwords,setPasswords] = useState({
  oldpassword: "",
  newpassword: ""
  })
  const [passworderrors,setPasswordErrors] = useState({})
  const router = useRouter()
  const [passloading,setpassLoading] = useState(false)
  useEffect(()=>{
    if(user){
       setInput({
        name:user.name || "",
        email:user.email || "",
        profilepic:user.profilepic || null,
        phonesuffix:user.phonesuffix || "",
        phonenumber: user.phonenumber || "",
        address: user.address || ""
      })
       setImagePreview(user.profilepic && user.profilepic.trim() !== "" ? user.profilepic : null)
    }
  },[user])


  const validateErrors = ()=>{
     let newErrors = {}     
     if(!input.name.trim()){
       newErrors.name = "Name is Required"
     }
     if(!input.email.trim){
      newErrors.email = "Email is Required"
     }else if(!/^\S+@\S+\.\S+$/.test(input.email)){
      newErrors.email = "Enter Valid email"
     }
     if (!input.phonesuffix.trim()) {
    newErrors.phonesuffix = "Country code required";
  }
    if(!/^\d{10}$/.test(input.phonenumber)){
      newErrors.phonenumber = "Enter valid 10 digit number"
    }
     setErrors(newErrors)
     return Object.keys(newErrors).length === 0
  }

   const handleInputChange = (e)=>{
      const {name,value,files} = e.target 
      if(name === "profilepic"){
        const file = files[0]
        setInput((prev)=> ({...prev,profilepic:file}))
        if(file) setImagePreview(URL.createObjectURL(file))
      }else{
         setInput((prev)=>({...prev,[name]:value}))
         setErrors(prev => ({...prev,[name]:""}))
       }
   }
   const handlePasswordChange = (e)=>{
      const {name,value} = e.target 
        setPasswords((prev)=>({...prev,[name]:value}))
        setPasswordErrors(prev=> ({...prev,[name]:""}))
   }
   const validatePasswordErrors = ()=>{
     let newErrors = {}     
     if(!passwords.oldpassword){
       newErrors.oldpassword = "Old password is Required"
     }
     if(!passwords.newpassword){
      newErrors.newpassword = "New password is Required"
     }
     setPasswordErrors(newErrors)
     return Object.keys(newErrors).length === 0
  }
  const getProfileImage = (profilepic) => {
  if (!profilepic || profilepic.trim() === "") {
    return "/unknownuser.webp"; 
  }
  return profilepic;
  };
   const handleUpdateProfile = async()=>{
       if(!validateErrors()) return;
       let formdata = new FormData()
        formdata.append("name",input.name)
        formdata.append("email",input.email)
        formdata.append("phonesuffix",input.phonesuffix)
        formdata.append("phonenumber",input.phonenumber)
        formdata.append("address",input.address)

        if(input.profilepic instanceof File){
          formdata.append("profilepic",input.profilepic)
        }
        // for(let pair of formdata.entries()){
        //   console.log(pair[0], pair[1] )
        // }
        try {
          setloading(true)
           const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/citizen/updateprofile`,formdata,{
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

   const handleChangePassword = async()=>{
        if(!validatePasswordErrors()) return;
        try {
             setpassLoading(true)
             const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/citizen/changepassword`,{
              oldpassword:passwords.oldpassword,
              newpassword:passwords.newpassword
             },{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
             }
            )
            if(response.data){
              toast.success(response?.data?.message)
              localStorage.removeItem("token")
              dispatch(SetUser(null))
              router.replace("/auth")
            }
        } catch (error) {
          console.log("failed to change password",error)
          toast.error(error?.response?.data?.message || "Internal server error")
        }finally{
           setpassLoading(false)
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
                  {errors.name && (
                        <p className='text-red-500 text-[0.8rem]'>{errors.name}</p>
                 )}
             </div>
             <div className='flex flex-col gap-1 py-1'>
               <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Email
                </span>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-sm font-medium text-[#333]"
                />
                  {errors.email && (
                        <p className='text-red-500 text-[0.8rem]'>{errors.email}</p>
                 )}
             </div>
              <div className='flex flex-col  gap-1 py-1'>
                 <span className="text-[#909098] font-[400] text-[0.7rem]">
                  phone Number
                </span>
                <div className='flex gap-2 items-center'>
                    <input
                  type="number"
                  name="phonesuffix"
                  value={input.phonesuffix}
                  onChange={handleInputChange}
                  className="w-[40px] bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-sm font-medium text-[#333]"
                />
                <input
                  type="text"
                  maxLength={10}
                  name="phonenumber"
                  value={input.phonenumber}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-sm font-medium text-[#333]"
                />
                </div>
                 {errors.phonenumber && (
                        <p className='text-red-500 text-[0.8rem]'>{errors.phonenumber}</p>
                 )}
             </div>
              <div className='flex flex-col gap-1 py-1'>
               <span className="text-[#909098] font-[400] text-[0.7rem]">
                  address
                </span>
                <input
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={handleInputChange}
                  placeholder='e.g #75 abc homes delhi'
                  className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-sm font-medium text-[#333]"
                />
                  {errors.address && (
                        <p className='text-red-500 text-[0.8rem]'>Address is Required</p>
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
      <div className='flex justify-center mt-10 items-center'>
        <div className='flex border w-full md:w-[600px] px-4 py-3 rounded-md bg-white flex-col gap-2'>
          <span className='text-[#0A3D62] text-[1rem] font-semibold '>Change password</span>
          <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1 py-1'>
               <span className="text-[#909098] font-[400] text-[0.7rem]">
                  Old password
                </span>
                <input
                  type="password"
                  name="oldpassword"
                  value={passwords.oldpassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-sm font-medium text-[#333]"
                />
             </div>
             {passworderrors.oldpassword && (
                        <p className='text-red-500 text-[0.8rem]'>{passworderrors.oldpassword}</p>
                 )}
              <div className='flex flex-col gap-1 py-1'>
               <span className="text-[#909098] font-[400] text-[0.7rem]">
                  New password
                </span>
                <input
                  type="password"
                  name="newpassword"
                  value={passwords.newpassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-transparent outline-none border-0 border-b-2 border-[#eee] 
           focus:border-purple-600 px-0 py-1 text-sm font-medium text-[#333]"
                />
             </div>
             {passworderrors.newpassword && (
                        <p className='text-red-500 text-[0.8rem]'>{passworderrors.newpassword}</p>
                 )}
          </div>
          <div className='flex justify-end'>
            <button onClick={()=> handleChangePassword()} className='bg-[#0A3D62] px-3 py-2 text-[0.8rem] cursor-pointer rounded-md text-white'>
                  {passloading ? <Loader2 className='animate-spin w-4 h-5 mx-auto' /> : "Submit"}
              </button>
          </div>
        </div>

      </div>
    </>
  )
}

export default page