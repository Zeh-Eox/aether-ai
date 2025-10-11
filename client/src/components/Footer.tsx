import React from "react";
import { assets } from "../constants/assets";

const Footer: React.FunctionComponent = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="logo flex items-center gap-2 cursor-pointer mb-12">
          <img
            src={assets.icon}
            alt="Logo Icon"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
          />
          <span className="text-xl sm:text-2xl font-semibold text-primary">
            Aether.ai
          </span>
        </div>
        <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
          Empowering creators worldwide with the most advanced AI content
          creation tools. Transform your ideas into reality.
        </p>
      </div>
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          <a href="#">Aether.ai</a> &copy; {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
