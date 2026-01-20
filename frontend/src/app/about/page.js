import OurLegacyAndValues from '../../components/Aboutpage/OurLegacyAndValues.jsx'
import AboutHeader from '../../components/Aboutpage/AboutHeader.jsx'
import Navbar from '../../components/commen/Navbar'
import React from 'react'
import CityStatsBar from '../../components/Aboutpage/CityStatsBar.jsx'
import OurAdministration from '../../components/Aboutpage/OurAdministration.jsx'
import Footer from '../../components/Homepage/Footer.jsx'

export const metadata = {
  title: "About MCC Delhi – Serving Citizens Since 1958",
  description:
    "Learn about the Municipal Corporation of Delhi (MCC Delhi), its legacy, core values, administration, and commitment to transparent and citizen-centric governance.",
  keywords: [
    "About MCC Delhi",
    "Municipal Corporation of Delhi",
    "Delhi Civic Administration",
    "MCC Delhi History",
    "Delhi Local Government",
    "Civic Governance Delhi",
    "Public Administration Delhi",
  ],
  openGraph: {
    title: "About MCC Delhi – Civic Governance & Administration",
    description:
      "Explore MCC Delhi’s legacy, leadership, and initiatives aimed at improving civic services and governance in Delhi.",
    url: "https://mccdelhi.gov.in/about",
    siteName: "MCC Delhi",
    images: [
      {
        url: "https://mccdelhi.gov.in/logo.jpg",
        width: 1200,
        height: 630,
        alt: "About MCC Delhi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About MCC Delhi – Civic Governance Portal",
    description:
      "Discover the mission, values, and leadership of the Municipal Corporation of Delhi.",
    images: ["https://mccdelhi.gov.in/logo.jpg"],
  },
  alternates: {
    canonical: "https://mccdelhi.gov.in/about",
  },
};

const page = () => {
  return (
    <div className='w-full'>
        <Navbar />
        <AboutHeader />
        <OurLegacyAndValues />
        <CityStatsBar />
        <OurAdministration />
        <Footer />
    </div>
  )
}

export default page