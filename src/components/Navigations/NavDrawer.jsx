import React, { useState } from "react";
import {
  HiX,
} from "react-icons/hi";
import { CiMenuFries,CiHome,CiUser,CiMobile1,CiMap,CiSettings } from "react-icons/ci";
import UserDashboard from "@/views/Home/userDashboard";
import SettingsPage from "@/views/settings/settings";
import Footer from "../footer/footer";
import DropdownMenus from "./dropdownmenu";
import { getUser } from "@/auth/auth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(UserDashboard());

  const toggleSidebar = () => setIsOpen(!isOpen);
  const { user } = getUser();

  const menuItems = [
    { icon: CiHome, text: "Dashboard", section: "Home", page: UserDashboard() },
    {
      icon: CiUser,
      text: "Profile",
      section: "Home",
      page: UserDashboard(),
    },
    {
      icon: CiMobile1,
      text: "Devices",
      section: "Home",
      page: UserDashboard(),
    },

    { icon: CiMap, text: "Location Data", section: "Analytics" },
    { icon: CiSettings, text: "Settings", section: "Settings" , page: SettingsPage(),},
  ];

  const handleNavItemClick = (item) => {
    setContent(item);
  };

  return (
    <div className="flex overflow-hidden relative h-screen">
      <div
        className={` sideNav shadow-sm shadow-slate-700 z-10 transition-all  duration-300 ${
          isOpen ? "w-[350px] md: cancelSideNav " : "w-16"
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-4  ">
          {isOpen && <span className="font-bold text-xl ">Menu</span>}
          <button onClick={toggleSidebar} className="text-2xl ">
            {isOpen ? <HiX /> : <CiMenuFries />}
          </button>
        </div>
        <nav className="flex-grow">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {index === 0 || item.section !== menuItems[index - 1].section ? (
                <div
                  className={`text-gray-400 ${
                    isOpen ? "px-4 py-2" : "px-2 py-1 text-center"
                  }`}
                >
                  {isOpen ? item.section : "•"}
                </div>
              ) : null}
              <div
                className="relative group py-2 px-4 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => handleNavItemClick(item.page)}
              >
                <item.icon
                  className={`text-2xl ${isOpen ? "mr-4" : "mx-auto"}`}
                />
                {isOpen ? (
                  <span>{item.text}</span>
                ) : (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-700 rounded-md text-sm invisible group-hover:visible whitespace-nowrap z-10">
                    {item.text}
                  </span>
                )}
              </div>
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="flex flex-col overflow-auto p-5 w-[100%] ">
        <div className="w-[100%] h-[60px] shadow-sm  shadow-slate-700 innerNavBar  align-middle items-center rounded-xl px-4 top-0  flex justify-between  p-2">
          <h3 className="text-xl font-extrabold innernavicon">FindSafe</h3>
          <div className="flex items-center gap-2 ">
            <div className="innerNavUser flex items-center gap-2 ">
              <img
                src="herosection.png"
                alt=""
                className="h-[25px] w-[25px] rounded-3xl shadow-xl"
              />
              {user ? <h3 className="text-sm font-thin">{user.name}</h3> : null}
              {/* <h3 className="text-sm font-thin">Abdul Hafis Mohammed</h3> */}
            </div>

            <DropdownMenus />
          </div>
        </div>
        <br />
        {content}
        <br />
        <div className="w-[100%]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
