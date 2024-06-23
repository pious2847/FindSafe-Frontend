import React, { useState } from "react";
import {
  HiMenu,
  HiX,
  HiHome,
  HiSpeakerphone,
  HiLightBulb,
  HiSearch,
  HiClipboardCheck,
  HiChartBar,
  HiDocumentReport,
} from "react-icons/hi";
import UserDashboard from "@/views/Home/userDashboard";
import Footer from "../footer/footer";
import DropdownMenus from './dropdownmenu'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(UserDashboard());

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: HiHome, text: "Dashboard", section: "Home", page: UserDashboard() },
    { icon: HiSpeakerphone, text: "Announcements", section: "Home", page: UserDashboard()},
    { icon: HiLightBulb, text: "Employee Spotlight", section: "Home", page: UserDashboard()},
    { icon: HiSearch, text: "Profile Search", section: "Home",page: UserDashboard() },
    { icon: HiClipboardCheck, text: "Performance Reviews", section: "Home",page: UserDashboard() },
    { icon: HiChartBar, text: "Workforce Data", section: "Analytics" },
    { icon: HiDocumentReport, text: "Reports", section: "Analytics" },
  ];

  const handleNavItemClick = (item) => {
    setContent(item);
  };

  return (
    <div className="flex overflow-hidden relative h-screen">
      <div
        className={` shadow-lg text-white transition-all sticky duration-300 ${
          isOpen ? "w-[350px]" : "w-16"
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-4  ">
          {isOpen && <span className="font-bold text-xl ">Menu</span>}
          <button onClick={toggleSidebar} className="text-2xl ">
            {isOpen ? <HiX /> : <HiMenu />}
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
        <div className="w-[100%] h-[60px]  bg-slate-900 align-middle items-center rounded-xl px-4 top-0 backdrop-blur-3xl flex justify-between shadow-lg p-2">
          <h3 className="text-xl font-extrabold">FindSafe</h3>
          <div className="flex items-center gap-2">
            <img
              src="herosection.png"
              alt=""
              className="h-[25px] w-[25px] rounded-3xl shadow-xl"
            />
            <h3 className="text-sm font-thin">Abdul Hafis Mohammed</h3>
            <DropdownMenus/>
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
