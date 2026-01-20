"use client"
import { motion } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { value: 12, label: "Administrative Zones" },
  { value: 250, label: "Municipal Wards" },
  { value: 11, suffix: "M+", label: "Citizens Served" },
  { value: 1400, label: "Sq. Km. Area" },
];

const CityStatsBar = () => {
  return (
    <section className="bg-[#0A3D62]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                  },
                },
              }}
              className="flex flex-col items-center gap-1"
            >
              {/* NUMBER */}
              <span className="text-[#F9B233] text-[2rem] font-bold">
                <CountUp
                  start={0}
                  end={item.value}
                  duration={2}
                  separator=","
                  enableScrollSpy
                  scrollSpyOnce
                />
                {item.suffix || ""}
              </span>

              {/* LABEL */}
              <span className="text-white text-[0.8rem] font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CityStatsBar