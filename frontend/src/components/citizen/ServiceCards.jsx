 "use client";
import {
  Trash2,
  Droplets,
  Lightbulb,
  Construction,
} from "lucide-react";
import React from 'react'

const ServiceCards = () => {
   

const services = [
  {
    title: "Garbage Collection",
    icon: Trash2,
  },
  {
    title: "Water Supply",
    icon: Droplets,
  },
  {
    title: "Street Lights",
    icon: Lightbulb,
  },
  {
    title: "Road Repair",
    icon: Construction,
  },
];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border
                shadow-sm hover:shadow-md
                transition-all duration-300
                flex flex-col items-center justify-center
                py-6 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-100 mb-3">
                  <Icon className="w-6 h-6 text-[#0A3D62]" />
                </div>

                {/* Title */}
                <p className="text-sm font-medium text-slate-700 text-center">
                  {service.title}
                </p>
              </div>
            );
          })}
        </div>
  )
}

export default ServiceCards