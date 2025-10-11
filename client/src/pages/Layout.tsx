import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../constants/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = React.useState<boolean>(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <div
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
        </div>

        {sidebar ? (
          <X
            className="w-6 h-6 text-gray-600 sm:hidden"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 text-gray-600 sm:hidden"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
