/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import {
  CiMenuFries,
  CiHome,
  CiUser,
  CiMobile1,
  CiMap,
  CiSettings,
} from "react-icons/ci";
import Footer from "../footer/footer";
import DropdownMenus from "./dropdownmenu";
import { getUser } from "@/auth/auth";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const { user } = getUser();

  const menuItems = [
    { icon: CiHome, text: "Dashboard", section: "Home", url: "/dashboard" },
    {
      icon: CiUser,
      text: "Profile",
      section: "Home",
      url: "/dashboard/profile",
    },
    {
      icon: CiMobile1,
      text: "Devices",
      section: "Home",
      url: "/dashboard/devices",
    },

    {
      icon: CiMap,
      text: "Location Data",
      section: "Analytics",
      url: "/dashboard/locations",
    },
    {
      icon: CiSettings,
      text: "Settings",
      section: "Settings",
      url: "/dashboard/settings",
    },
  ];

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
              <NavLink to={item.url}>
                <div className="relative group py-2 px-4 hover:bg-gray-700 cursor-pointer flex items-center">
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
              </NavLink>
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="flex flex-col overflow-auto p-5 w-[100%] ">
        <div className="w-[100%] h-[60px] shadow-xl innerNavBar  align-middle items-center rounded-xl px-4 top-0  flex justify-between  p-2">
          <h3 className="text-xl font-extrabold innernavicon">FindSafe</h3>
          <div className="flex items-center gap-2 ">
            <div className="innerNavUser flex items-center gap-2 ">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}`}
                alt=""
                className="h-[25px] w-[25px] rounded-3xl shadow-xl"
              />
              {user ? <h3 className="text-sm font-thin">{user.name}</h3> : null}
            </div>
            <DropdownMenus />
          </div>
        </div>
        <br />
        {children}
        <br />
        <div className="w-[100%]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
