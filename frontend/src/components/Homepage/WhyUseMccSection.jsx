"use client";

import { CheckCircle, ShieldCheck, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Real-time Tracking",
    desc: "Monitor the status of your complaint at every step of the resolution process.",
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Official Action",
    desc: "All complaints are directly routed to the concerned department officers.",
    icon: ShieldCheck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Mobile Friendly",
    desc: "Access the portal from anywhere using our responsive mobile web app.",
    icon: Smartphone,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const WhyUseMCCSection = () => {
  return (
    <section className="w-full bg-white py-20 relative">
      {/* subtle divider effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62]">
            Why Use MCC Delhi Portal?
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Designed to bridge the gap between citizens and administration.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-start gap-4 group"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-lg 
                  ${item.iconBg}
                  transition-all duration-300
                  group-hover:scale-110 group-hover:shadow-md`}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                {/* Text */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#0A3D62] transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* bottom divider */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
};

export default WhyUseMCCSection;
