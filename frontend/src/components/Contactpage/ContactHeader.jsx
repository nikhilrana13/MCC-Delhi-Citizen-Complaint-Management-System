"use client";

import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <section className="relative w-full bg-[#F4F7FB] overflow-hidden">
      {/* subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#E6EEF8,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A3D62]"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-600"
        >
          Have questions or need assistance? Reach out to us through any of the
          channels below.
        </motion.p>
      </div>
    </section>
  );
};

export default ContactHeader;
