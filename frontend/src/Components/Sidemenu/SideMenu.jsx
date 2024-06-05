import React from "react";
import { GiHamburger } from "react-icons/gi";

const SideMenu = () => {
  return (
    <div className="bg-sideMenuBg relative h-[100%] basis-[20%] p-4">
      {/* logo div */}
      <div className="logo mt-4 gap-2 text-[white] flex items-center justify-center m-auto">
        <GiHamburger className="text-[20px]" />
        <h1 className="text-[20px] align-center font-black">Foodie</h1>
      </div>
      {/* User div */}

      <div className="flex items-center justify-center text-[white] flex-col mt-[3rem] ad">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Admin Image"
          className="h-[80px] w-[80px] border-red-200 border-[4px] object-cover rounded-full"
        />
        <span className="opacity-70 mt-2 text-gray-400">welcome</span>
        <h3 className="font-bold text-textColor">Admin</h3>
      </div>

      {/* menu div */}
      <div className="m-auto grid justify-center mt-4">
        <li className="flex pt-3 pb-3 pl-3 gap-2 hover:opacity-100 items-center"></li>
      </div>
    </div>
  );
};

export default SideMenu;
