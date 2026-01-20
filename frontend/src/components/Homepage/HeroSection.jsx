"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const user = useSelector((state)=>state.Auth.user)
  const router = useRouter()
  return (
    <section className="w-full bg-[#F6FBFF] overflow-hidden">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-2 bg-[#E0F2FE] font-medium text-[#0A3D62] px-4 py-2 rounded-full text-sm w-fit">
            🏛️ Better Governance, Better City
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-[#0A3D62] leading-tight">
            Report Civic Issues.
            <br />
            Track Resolution.
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-xl">
            Empowering citizens to build a cleaner, safer Delhi.
            Submit your grievances online and track them in real-time.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={()=>{
                      if(!user){
                        toast.error("Please login to Register a complaint");
                      }else{
                        router.replace("/citizen/createcomplaint")
                      }
                    }}
              aria-label="Register a civic complaint"
              className="bg-[#0A3D62] cursor-pointer text-white px-6 py-3 rounded-md font-semibold hover:bg-[#08304d] transition"
            >
              Register a Complaint
            </button>

            <Link
              href="/track"
              className="border border-gray-300 px-6 py-3 rounded-md font-semibold text-[#0A3D62] hover:bg-gray-100 transition"
            >
              Track Status
            </Link>
          </div>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-6 pt-2">
            {["Fast Resolution", "24/7 Support", "Official Portal"].map(
              (item, i) => (
                <div key={i} className="flex items-center font-medium gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {item}
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px] rounded-xl overflow-hidden"
        >
          {/* IMAGE */}
          <Image
            src="/heroimg.webp"
            alt="City View"
            fill
            className="object-cover"
            priority
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0A3D62]/50 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* STATS */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 pb-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard end={1200000} suffix="+" label="Citizens Registered" color="text-[#0A3D62]" />
          <StatCard end={85} suffix="%" label="Complaints Resolved" color="text-green-500" />
          <StatCard end={12000} suffix="" label="Active Cases" color="text-orange-500" />
          <StatCard end={24} suffix="h" label="Avg. Response Time" color="text-red-500" />
        </div>
      </motion.div>
    </section>
  );
};

const StatCard = ({ end, suffix, label, color }) => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-6 text-center">
      <h3 className={`text-3xl font-bold ${color}`}>
        <CountUp end={end} duration={2} separator="," />
        {suffix}
      </h3>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
};

export default HeroSection;
