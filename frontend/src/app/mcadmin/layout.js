import Sidebar from '../../components/commen/Sidebar'
import React from 'react'

const Mclayout = ({children}) => {
  return (
     <div className='w-full flex flex-col agp-1 md:flex-row '>
        {/* left side */}
        <div className='w-full md:w-[20%] border-r border-gray-300 min-h-screen'>
            <Sidebar />
        </div>
        {/* right side  */}
        <div className='w-full md:w-[80%] flex flex-col '>
            {children}
        </div>
    </div>
  )
}

export default Mclayout