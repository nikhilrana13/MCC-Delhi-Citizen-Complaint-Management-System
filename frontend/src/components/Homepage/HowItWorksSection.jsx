"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { FilePlus, ShieldCheck, CheckCircle } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    title: "Register Complaint",
    desc: "Login to the portal, select the category, provide location and photo evidence.",
    icon: FilePlus,
    activeColor: "text-[#0A3D62]",
    bg: "bg-blue-100",
  },
  {
    title: "Verification & Action",
    desc: "The concerned officer verifies your report and initiates the resolution process.",
    icon: ShieldCheck,
    activeColor: "text-[#0A3D62]",
    bg: "bg-blue-100",
  },
  {
    title: "Resolution & Closure",
    desc: "The issue is resolved, you receive a notification, and the ticket is closed.",
    icon: CheckCircle,
    activeColor: "text-green-600",
    bg: "bg-green-100",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef(null);

  // scroll-based animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // animated line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F9FBFD] py-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62]">
            How It Works
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2">
            Your grievance is our priority. Here is how we resolve it.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row gap-12 md:gap-8">

          {/* Vertical / Horizontal Line */}
          <div className="absolute left-5 top-0 md:left-0 md:right-0 md:top-6 
                          w-[2px] md:w-full md:h-[2px] h-full bg-gray-200">
            <motion.div
              style={{
                height: "100%",
                width: "100%",
                scaleY: lineHeight,
                transformOrigin: "top",
              }}
              className="bg-[#0A3D62] md:scale-y-100 md:scale-x-100"
            />
          </div>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:text-center flex-1"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center 
                  rounded-full ${step.bg} z-10`}
                >
                  <Icon className={`w-6 h-6 ${step.activeColor}`} />
                </div>

                {/* Content */}
                <div className="max-w-sm">
                  <h3 className="text-base font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
