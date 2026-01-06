"use client"
import { auth, GoogleProvider } from '../../config/firebase'
import useAfterAuthSuccess from '../../hooks/useAfterAuthSuccess'
import { SetUser } from '../../redux/AuthSlice'
import axios from 'axios'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiArrowFromLeft, BiArrowFromRight, BiLock, BiUser } from 'react-icons/bi'
import { MdEmail } from 'react-icons/md'
import { RiGovernmentLine } from 'react-icons/ri'
import { TbLoader2 } from 'react-icons/tb'
import { useDispatch } from 'react-redux'


const LoginAndSignup = () => {
  const [Step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [Errors, SetErrors] = useState({})
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const { afterAuthSuccess } = useAfterAuthSuccess()
  const router = useRouter()

  const Validation = () => {
    let errors = {}
    if (Step === 2 && !input.name.trim()) {
      errors.name = "Name is Required"
    }
    if (!emailRegex.test(input.email)) {
      errors.email = "Please Enter a valid email address"
    }
    if (!passwordRegex.test(input.password)) {
      errors.password = "Password must contain letters and numbers (minimum 6 characters)."
    }
    SetErrors(errors)
    return Object.keys(errors).length === 0;
  }
  const handleInputChange = (e) => {
    const { value, name } = e.target
    setInput({ ...input, [name]: value })
    // remove errors on typing
    SetErrors(prev => ({ ...prev, [name]: "" }))
  }
  const onSignUp = async () => {
    // Check if all the fields are valid
    if (!Validation()) return
    // Create a new user object
    const data = {
      name: input.name,
      email: input.email,
      password: input.password
    }
    // Log the user data for debugging
    // console.log("data", data)
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, data, {
        withCredentials: true
      })
      if (response.data) {
        toast.success(response?.data?.message)
        setInput({
          name: "",
          email: "",
          password: "",
        })
        setStep(2)
      }
    } catch (error) {
      console.log("failed to sign up", error)
      toast.error(error?.response?.data?.message || "Internal server error")
    } finally {
      setLoading(false)
    }
  }
  const onLogin = async () => {
    if (!Validation()) return
    const data = {
      email: input.email,
      password: input.password
    }
    // console.log("data", data)
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, data, {
        withCredentials: true
      })
      // console.log("response", response)
      if (response.data) {
        toast.success(response?.data?.message)
        localStorage.setItem("token", response?.data?.data?.token)
        const user = response?.data?.data?.user
        dispatch(SetUser(user))
        await afterAuthSuccess(user?.id)
        if (user?.role === "citizen") {
          router.replace("/citizen/dashboard")
        } else {
          router.replace("/mcadmin/dashboard")
        }
      }
    } catch (error) {
      console.log("failed to Login", error)
      toast.error(error?.response?.data?.message || "Internal server error")
    } finally {
      setLoading(false)
    }
  }
  const handleLoginWithgoogle = async () => {
    try {
      await signOut(auth)
      const result = await signInWithPopup(auth, GoogleProvider)
      const token = await result.user.getIdToken();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google-login`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }, withCredentials: true
      })
      if (response.data) {
        localStorage.setItem("token", response?.data?.data?.token)
        const user = response?.data?.data?.user
        dispatch(SetUser(user))
        await afterAuthSuccess(user?.id)
        if (user?.role === "citizen") {
          router.replace("/citizen/dashboard")
        } else {
          router.replace("/mcadmin/dashboard")
        }
      }
    } catch (error) {
      console.log("failed to Login", error)
      if (error.code !== "auth/cancelled-popup-request") {
        toast.error("Google login failed");
        console.error(error);
      }
      toast.error(error?.response?.data?.message || "Internal server error")
    }
  }
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#0A3D62] mb-3">
          <RiGovernmentLine size={26} className="text-white" />
        </div>
        <h2 className="text-xl font-semibold text-[#0A3D62]">MCC Delhi</h2>
        <p className="text-sm text-gray-500">
          Municipal Corporation of Delhi
        </p>
      </div>
      {/* name */}
      {
        Step === 2 && (
          <div className="mb-4">
            <label className="text-sm font-medium text-[#0A3D62]">
              Name
            </label>
            <div className="relative mt-1">
              <BiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="e.g Rajesh kumar"
                className="w-full pl-10 pr-4 py-2 border placeholder:text-sm border-gray-300 focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
              />
            </div>
            {Errors.name && (
              <p className="text-red-500 mt-1 text-[0.75rem]">{Errors.name}</p>
            )}
          </div>
        )
      }
      {/* Email */}
      <div className="mb-4">
        <label className="text-sm font-medium text-[#0A3D62]">
          Email Address
        </label>
        <div className="relative mt-1 ">
          <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            required
            value={input.email}
            onChange={handleInputChange}
            placeholder="name@example.com"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 placeholder:text-sm focus:border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
          />
        </div>
        {Errors.email && (
          <p className="text-red-500 mt-1 text-[0.75rem]">{Errors.email}</p>
        )}
      </div>
      {/* Password */}
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="text-sm font-medium text-[#0A3D62]">
            Password
          </label>
          <span className="text-sm text-[#0A3D62] cursor-pointer hover:underline">
            Forgot Password?
          </span>
        </div>
        <div className="relative mt-1">
          <BiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2 border rounded-md  border-gray-300 focus:border-none  focus:outline-none focus:ring-2 focus:ring-[#0A3D62]"
          />
        </div>
        {Errors.password && (
          <p className="text-red-500 mt-2 text-[0.75rem]">{Errors.password}</p>
        )}
      </div>

      {/* Sign In Button */}
      <button onClick={() => { Step === 1 ? onLogin() : onSignUp() }} className={`w-full mt-2 text-[1rem] cursor-pointer items-center justify-center flex gap-2 bg-[#0A3D62] text-white py-2 rounded-md font-medium hover:bg-[#08314e] transition ${loading ? "opacity-70 cursor-not-allowed" : ""} `}>
        {
          loading ? (
            <TbLoader2 className='animate-spin mx-auto w-5 h-5' />
          ) : (
            Step === 1 ? "Sign In  " : "Sign up"
          )
        }
      </button>

      {/* Divider */}
      {
        Step === 1 && (
          <>
            <div className="flex items-center my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-500">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <button onClick={() => handleLoginWithgoogle()} className="w-full border py-2 border-gray-300 cursor-pointer rounded-md flex items-center justify-center gap-2 hover:bg-gray-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5"
              />
              <span className="text-sm font-medium">Google</span>
            </button>
          </>
        )
      }
      <span onClick={() => {
        setStep(Step === 1 ? 2 : 1);
        setInput({
          name: "",
          email: "",
          password: "",
        });
        SetErrors({});
      }} className='flex justify-center text-[0.9rem] w-full mt-3 gap-2 font-medium text-gray-400'>
        {Step === 1 ? "Don't have an account?" : "Already have a account?"}<span className='text-[#0A3D62] cursor-pointer text-[0.9rem] font-medium'>
          {Step === 1 ? " Sign up" : "Sign In"}
        </span></span>
    </div>
  )
}

export default LoginAndSignup