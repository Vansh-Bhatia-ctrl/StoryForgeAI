import { GitBranch, Menu } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="bg-custom-gray-200 fixed w-screen h-20 flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-2">
            <GitBranch className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold md:text-lg">StoryForge AI</p>
            <p className="text-slate-400 text-sm">
              Professional Story Buidling
            </p>
          </div>
        </div>

        <div className="cursor-pointer">
          <Menu className="text-white" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
