
import React from 'react'
import Navbar from "../components/commen/Navbar"
import HeroSection from '../components/Homepage/HeroSection'
import ReportCategorySection from '../components/Homepage/ReportCategorySection'
import WhyUseMCCSection from '../components/Homepage/WhyUseMccSection'
import HowItWorksSection from '../components/Homepage/HowItWorksSection'
import Footer from '../components/Homepage/Footer'





export const metadata = {
  title: "Report Civic Issues & Track Resolution",
  description: "Register civic complaints and track resolution in real time.",
};

const Home = () => {
  return (
    <div className='w-full '>
      <header>
         <div className='flex items-center bg-[#06263D] flex-col px-8 py-2 md:px-24 justify-center md:flex-row md:justify-between'>
          <span className='text-white font-medium text-[0.7rem] md:text-[0.8rem]'>Offical Portal of Municipal Corporation of Delhi</span>
           <span className='text-white flex gap-3 text-[0.7rem] md:text-[0.8rem] font-medium'>
             Help Line: 155304
            <span className='text-white font-medium text-[0.7rem] md:text-[0.8rem] '>Language: English</span>
           </span>
        </div>
        <Navbar />
        </header>
        {/* hero section */}
        <HeroSection />
        {/* RCS */}
        <ReportCategorySection />
        {/* why use mcc section  */}
        <WhyUseMCCSection />
        {/* how it works section */}
        <HowItWorksSection />
        {/* footer */}
        <Footer />
    </div>
  )
}

export default Home