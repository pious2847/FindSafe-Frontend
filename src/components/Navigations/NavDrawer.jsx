/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Routes, Route, NavLink } from "react-router-dom";
import {
  X,
  Menu,
  Home,
  User,
  Smartphone,
  MapPin,
  Settings
} from "lucide-react";
import Footer from "../footer/footer";
import DropdownMenus from "./dropdownmenu";
import { getUser } from "@/auth/auth";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";

// Import dashboard pages
import UserDashboard from "@/views/Home/userDashboard";
import SimpleDashboard from "@/views/Home/SimpleDashboard";
import UserProfile from "@/views/profile/userProfile";
import UserDevices from "@/views/devices/UserDevices";
import LocationsDataPage from "@/views/Locations/LocationsPage";
import SettingsPage from "@/views/settings/settings";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const {user} = getUser();

  const menuItems = [
    {
      icon: Home,
      text: "Dashboard",
      section: "Home",
      url: "/dashboard",
      color: "text-neon-cyan",
      bgColor: "bg-cyan-500/20"
    },
    {
      icon: User,
      text: "Profile",
      section: "Home",
      url: "/dashboard/profile",
      color: "text-neon-purple",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: Smartphone,
      text: "Devices",
      section: "Home",
      url: "/dashboard/devices",
      color: "text-neon-green",
      bgColor: "bg-green-500/20"
    },
    {
      icon: MapPin,
      text: "Location Data",
      section: "Analytics",
      url: "/dashboard/locations",
      color: "text-neon-pink",
      bgColor: "bg-pink-500/20"
    },
    {
      icon: Settings,
      text: "Settings",
      section: "Settings",
      url: "/dashboard/settings",
      color: "text-neon-orange",
      bgColor: "bg-orange-500/20"
    },
  ];

  const sidebarVariants = {
    open: {
      width: 280,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      width: 80,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  return (
    <div className="flex h-screen relative">
      <AnimatedBackground variant="dashboard" />

      {/* Sidebar */}
      <motion.div
        className="sideNav h-[100vh] relative z-20 flex flex-col"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <GlassCard className="h-full rounded-none border-r border-white/20 bg-black/30 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <AnimatePresence>
              {isOpen && (
                <motion.h2
                  className="text-xl font-bold text-neon-cyan"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  FindSafe
                </motion.h2>
              )}
            </AnimatePresence>
            <motion.button
              onClick={toggleSidebar}
              className="text-xl text-white/70 hover:text-neon-cyan transition-colors p-2 rounded-lg hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2 space-y-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group relative ${
                      isActive
                        ? `${item.bgColor} ${item.color} border border-current/30 shadow-lg`
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="relative"
                  >
                    <item.icon className="text-xl" />
                  </motion.div>

                  <AnimatePresence>
                    {isOpen ? (
                      <motion.span
                        className="font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.text}
                      </motion.span>
                    ) : (
                      <motion.div
                        className="absolute left-full ml-2 px-3 py-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-lg text-sm invisible group-hover:visible whitespace-nowrap z-50"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.text}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active indicator */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="ml-auto w-2 h-2 rounded-full bg-current opacity-0 group-hover:opacity-100"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </AnimatePresence>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* User section at bottom */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="p-4 border-t border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-neon-cyan/50"
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{user?.name}</p>
                    <p className="text-white/50 text-xs">Online</p>
                  </div>
                  <motion.div
                    className="w-2 h-2 bg-neon-green rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation Bar */}
        <motion.div
          className="sticky top-0 z-10 p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-4 bg-black/20">
            <div className="flex justify-between items-center">
              <motion.h3
                className="text-xl font-bold text-neon-cyan"
                animate={{
                  textShadow: [
                    "0 0 5px #00ffff",
                    "0 0 10px #00ffff",
                    "0 0 5px #00ffff"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                FindSafe
              </motion.h3>

              <div className="flex items-center gap-4">
                <motion.div
                  className="innerNavUser flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10"
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <img
                    src={user?.profilePicture}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-neon-purple/50"
                  />
                  {user && (
                    <div className="hidden md:block">
                      <p className="text-white font-medium text-sm">{user?.name}</p>
                      <p className="text-white/50 text-xs">Administrator</p>
                    </div>
                  )}
                </motion.div>
                <DropdownMenus />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Routes>
              <Route index element={
                <UserDashboard />
              } />
              <Route path="profile" element={<UserProfile />} />
              <Route path="devices" element={<UserDevices />} />
              <Route path="locations" element={<LocationsDataPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </motion.div>
        </div>

        {/* Footer */}
        {/* <motion.div
          className="p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard className="p-4 bg-black/20">
            <Footer />
          </GlassCard>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Sidebar;
