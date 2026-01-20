"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Leaf } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const OurLegacyAndValues = () => {
  return (
     <section className="bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* ===== OUR LEGACY ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#0A3D62] text-[1.6rem] font-semibold mb-5">
              Our Legacy
            </h2>

            <p className="text-gray-500 text-[0.9rem] leading-relaxed mb-5">
              The Municipal Corporation of Delhi (MCC) is one of the largest
              municipal bodies in the world providing civic services to
              approximately 11 million citizens in Delhi. It occupies an area
              of 1397.3 sq. km, which is sub-divided into 12 Zones.
            </p>

            <p className="text-gray-500 text-[0.9rem] leading-relaxed">
              MCC has been at the forefront of implementing unique initiatives
              for the development of the city, focusing on efficiency,
              transparency, and citizen participation in governance.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />

            <Image
              src="/heroimg.webp"
              alt="India Gate Delhi"
              width={700}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* ===== CORE VALUES ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 text-center"
        >
          <h3 className="text-[#0A3D62] text-[1.7rem] font-semibold">
            Core Values
          </h3>
          <p className="text-gray-500 text-[0.9rem] mt-2">
            The principles that guide our daily operations and long-term planning.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

            {/* CARD */}
            {[
              {
                icon: ShieldCheck,
                title: "Integrity & Transparency",
                desc:
                  "We believe in open governance. All our processes, from tenders to grievance redressal, are digital and accessible to every citizen.",
              },
              {
                icon: HeartHandshake,
                title: "Citizen Centricity",
                desc:
                  "Our policies are designed with the citizen at the center. We strive to provide responsive, efficient, and empathetic service.",
              },
              {
                icon: Leaf,
                title: "Sustainability",
                desc:
                  "Committed to a greener future through waste-to-energy plants, mechanized sweeping, and extensive tree plantation drives.",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-[#EEF3F8] mb-4">
                    <Icon className="w-6 h-6 text-[#0A3D62]" />
                  </div>
                  <h4 className="text-[#0A3D62] font-semibold text-[0.95rem] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-[0.8rem] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default OurLegacyAndValues