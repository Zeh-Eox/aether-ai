import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import React from "react";
import { navItems } from "../constants";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

interface PropTypes {
  sidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<PropTypes> = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 z-50 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt="User Avatar"
          className="w-13 rounded-full mx-auto"
          onClick={() => openUserProfile()}
        />
        <h1 className="mt-1 text-center">{user?.fullName}</h1>

        <div className="px-6 mt-12 text-sm text-gray-600 font-medium relative">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
            >
              {({ isActive }) => (
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="activeHighlight"
                      className="absolute inset-0 rounded bg-gradient-to-r from-[#3C81F6] to-[#9234EA] shadow-md"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <div
                    className={`relative z-10 px-3.5 py-2.5 flex items-center gap-3 rounded transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-white" : ""}`}
                    />
                    {label}
                  </div>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div
          onClick={() => openUserProfile()}
          className="flex gap-2 items-center coursor-pointer"
        >
          <img
            src={user?.imageUrl}
            className="w-8 rounded-full"
            alt="User Avatar"
          />
          <div>
            <h1 className="text-sm font-medium">{user?.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </p>
          </div>
        </div>
        <LogOut
          className="w-4.5 text-red-500 hover:text-red-700 transition cursor-pointer"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default Sidebar;
