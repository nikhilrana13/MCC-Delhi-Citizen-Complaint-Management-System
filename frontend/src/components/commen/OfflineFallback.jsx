"use client"
import { WifiOff } from 'lucide-react'
import React from 'react'

const OfflineFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
      <WifiOff className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold text-[#0A3D62]">
        You are offline
      </h1>
      <p className="text-gray-500 mt-2 max-w-md">
        Please check your internet connection and try again.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 cursor-pointer bg-[#0A3D62] text-white rounded-md"
      >
        Retry
      </button>
    </div>
  )
}

export default OfflineFallback