"use client";

import {
  Trash2,
  Construction,
  Droplets,
  Lightbulb,
  TreePine,
  PawPrint,
  AlertTriangle,
  LayoutGrid,
} from "lucide-react";

const categories = [
  {
    title: "Garbage & Sanitation",
    desc: "Uncollected waste, sweeping, public bins.",
    icon: Trash2,
    color: "bg-red-100 text-red-500",
  },
  {
    title: "Roads & Potholes",
    desc: "Damaged roads, footpaths, repairs.",
    icon: Construction,
    color: "bg-gray-100 text-gray-700",
  },
  {
    title: "Water Supply",
    desc: "No water, leakage, contamination issues.",
    icon: Droplets,
    color: "bg-blue-100 text-blue-500",
  },
  {
    title: "Street Lights",
    desc: "Non-functional lights, pole damages.",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-500",
  },
  {
    title: "Parks & Garden",
    desc: "Maintenance, pruning, benches.",
    icon: TreePine,
    color: "bg-green-100 text-green-500",
  },
  {
    title: "Animal Control",
    desc: "Stray animals, dead animal removal.",
    icon: PawPrint,
    color: "bg-purple-100 text-purple-500",
  },
  {
    title: "Encroachment",
    desc: "Illegal construction, hawkers.",
    icon: AlertTriangle,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Other Issues",
    desc: "Tax, licenses, health certificates.",
    icon: LayoutGrid,
    color: "bg-sky-100 text-sky-600",
  },
];
const ReportCategorySection = () => {
  return (
    <section className="w-full bg-[#E9ECEF] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62]">
            What would you like to report?
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            Select a category to quickly file a grievance with the concerned department.
          </p>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border p-6 text-center cursor-pointer
                           transition-all duration-300 hover:-translate-y-1
                           hover:shadow-lg hover:border-[#0A3D62]"
              >
                <div
                  className={`w-14 h-14 mx-auto flex items-center justify-center 
                              rounded-full ${cat.color} mb-4`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReportCategorySection;
