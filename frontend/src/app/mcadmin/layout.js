import Sidebar from '../../components/commen/Sidebar'
import React from 'react'

const Mclayout = ({children}) => {
  return (
     <div className='w-full flex flex-col agp-1 md:flex-row '>
        {/* left side */}
        <div className='w-full md:w-[20%]  min-h-screen'>
            <Sidebar />
        </div>
        {/* right side  */}
        <div className='w-full md:w-[80%] bg-[#F5F7FA] h-[102vh]  flex flex-col '>
            {children}
        </div>
    </div>
  )
}

export default Mclayout