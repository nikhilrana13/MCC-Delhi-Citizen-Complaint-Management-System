import Sidebar from '../../components/commen/Sidebar'
import React from 'react'

const Citizenlayout = ({children}) => {
  return (
    <div className='w-full flex flex-col agp-1 md:flex-row '>
        {/* left side */}
        <div className='w-full md:w-[20%] border min-h-screen'>
            <Sidebar />
        </div>
        {/* right side  */}
        <div className='w-full md:w-[80%] flex flex-col border'>
            {children}
        </div>
    </div>
  )
}

export default Citizenlayout