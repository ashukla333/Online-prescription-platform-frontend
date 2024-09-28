import React from "react";
import { FaPrescriptionBottleAlt } from "react-icons/fa"; // Prescription-related icon

const MainLogo = ({ className, icon }) => {
  return (
    <div className="font-bold text-2xl flex items-center gap-2">
      <span
        className={`flex items-center uppercase tracking-wide font-extrabold ${className}`}
      >
        <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
          Health
        </span>
        <span className="px-1 text-primary-black-color"> & </span>
        <span className="relative">
          <FaPrescriptionBottleAlt
            className={`h-10 w-10 text-primary-theme-color animate-pulse transition-transform transform hover:rotate-12 hover:scale-125 duration-300 ease-in-out ${icon}`}
          />
          <span className="absolute top-[-10px] left-[50%] transform -translate-x-1/2 text-xs bg-green-600 text-white rounded-full px-2 py-[1px] animate-bounce">
            Care
          </span>
        </span>
      </span>
    </div>
  );
};

export default MainLogo;
