
import Link from 'next/link'
import LoginAndSignup from '../../components/commen/LoginAndSignup'
import React from 'react'
import { ArrowLeft } from 'lucide-react'

const AuthPage = () => {
 
  return (
    <>
     <div className='flex justify-start bg-[#f5f7fb]'>
      <Link href="/" className='px-4 md:px-8 my-3 items-center  flex gap-2 text-[0.8rem] font-medium'>
      <ArrowLeft /> Back to home
      </Link>
     </div>
    <div className="min-h-screen w-full flex pb-4 flex-col mx-auto items-center justify-center  bg-[#f5f7fb]   px-4">
            <LoginAndSignup />
          {/* Footer */}
      <p className=" text-xs mt-8 text-gray-400 text-center px-4">
        This is an official portal of the Municipal Corporation of Delhi.
        Unauthorized access is punishable under the IT Act.
        <br />
        For technical support, contact support@mccdelhi.gov.in
      </p>
    </div></>
  )
}

export default AuthPage  
