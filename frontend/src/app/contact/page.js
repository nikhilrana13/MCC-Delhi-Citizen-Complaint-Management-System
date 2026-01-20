import ContactSection from '../../components/Contactpage/ContactSection.jsx'
import ContactHeader from '../../components/Contactpage/ContactHeader.jsx'
import Navbar from '../../components/commen/Navbar'
import React from 'react'
import Footer from '../../components/Homepage/Footer.jsx'


export const metadata = {
  title: "Contact MCC Delhi – Civic Support",
  description:
    "Contact MCC Delhi for civic complaints, public grievance support and municipal services.",
};

const page = () => {
  return (
    <div className='w-full'>
        <Navbar />
        <ContactHeader />
        <ContactSection />
        <Footer />
        
    </div>
  )
}

export default page