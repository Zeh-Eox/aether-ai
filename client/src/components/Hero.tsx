import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../constants/assets";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const Hero: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create amazing content <br /> with{" "}
          <span className="text-primary">AI Tools</span>
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform your content creation with our suit of premium AI tools.
          Write article, generate images and enhance your workflow.
        </p>
      </div>

      <div className="flex flex-wrap flex-row-reverse justify-center gap-4 text-sm max-sm:text-xs">
        <motion.button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg cursor-pointer flex gap-2 items-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Creating Now <ArrowRight className="w-4 h-4" />
        </motion.button>
        <motion.button
          className="px-10 py-3 rounded-lg border border-primary cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toast.error("Demo not available yet")}
        >
          Watch Demo
        </motion.button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="" className="h-8" /> Trusted by 10k+
        people
      </div>
    </section>
  );
};

export default Hero;
