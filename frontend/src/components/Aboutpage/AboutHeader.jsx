"use client";

import { motion } from "framer-motion";

const AboutHeader = () => {
  return (
    <header className="w-full bg-[#EEF3F8]">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#0A3D62] text-2xl sm:text-3xl md:text-4xl font-bold"
        >
          Serving Delhi Since 1958
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed"
        >
          We are dedicated to making Delhi a cleaner, greener, and more
          sustainable world-class city for its 11 million residents.
        </motion.p>
      </div>
    </header>
  );
};

export default AboutHeader;
