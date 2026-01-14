
import { Construction, Droplets, Lightbulb, ParkingSquare, Plug2, Trash2 } from 'lucide-react';
import React from 'react'
import { TbGardenCart } from 'react-icons/tb';

const CategoryCard = ({selectedCategory,setSelectedCategory}) => {
  const Category = [
  {
    title: "garbage",
    icon: Trash2,
  },
  {
    title: "water",
    icon: Droplets,
  },
  {
    title: "electricity",
    icon: Lightbulb,
  },
  {
    title: "road ",
    icon: Construction,
  },
  {
    title: "streetlight",
    icon: Lightbulb,
  },
   {
    title: "parks",
    icon: TbGardenCart,
  },
  {
    title: "others",
    icon: TbGardenCart ,
  },

];
 const handleSelectedCategory = (value)=>{
    setSelectedCategory(value)
  }
  return (
     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Category.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                onClick={()=> handleSelectedCategory(service.title)}
                className={` rounded-xl border
                shadow-sm hover:shadow-md
                transition-all duration-300
                flex flex-col items-center justify-center
                py-6 cursor-pointer ${selectedCategory === service.title ? "border-[#0A3D62] bg-[#E9F7EE]":"bg-white "} `}
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

export default CategoryCard