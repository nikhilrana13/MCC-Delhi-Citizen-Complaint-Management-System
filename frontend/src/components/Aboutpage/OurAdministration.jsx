"use client";
import Image from "next/image";
import { motion } from "framer-motion";


const OurAdministration = () => {
    const leaders = [
  {
    name: "Shri Arvind Kejriwal",
    role: "Hon’ble Chief Minister, Delhi",
    image: "/arvind.webp",
  },
  {
    name: "Shri Naresh Kumar, IAS",
    role: "Chief Secretary, Govt. of NCT of Delhi",
    image: "/nareshias.webp",
  },
  {
    name: "Shri Ashwani Kumar, IAS",
    role: "Municipal Commissioner, MCD",
    image: "/ashwani.webp",
  },
];

  return (
    <section className="bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-[#0A3D62] text-[1.8rem] font-semibold">
            Our Administration
          </h2>
          <p className="text-gray-500 text-[0.9rem] mt-2">
            Meet the leadership team driving Delhi’s development.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {leaders.map((leader, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 16,
                  },
                },
              }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-[260px]">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h3 className="text-[#0A3D62] font-semibold text-[0.95rem]">
                  {leader.name}
                </h3>
                <p className="text-gray-500 text-[0.8rem] mt-1">
                  {leader.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OurAdministration