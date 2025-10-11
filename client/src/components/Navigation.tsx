import React from "react";
import { assets } from "../constants/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Navigation: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className="fixed z-10 w-full backdrop-blur-3xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 border-b border-gray-200">
      <motion.div
        className="logo flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={assets.icon}
          alt="Logo Icon"
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
        />
        <span className="text-xl sm:text-2xl font-semibold text-primary hidden xs:inline-block sm:inline-block">
          Aether.ai
        </span>
      </motion.div>

      {user ? (
        <UserButton />
      ) : (
        <motion.button
          onClick={() => openSignIn()}
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </nav>
  );
};

export default Navigation;
