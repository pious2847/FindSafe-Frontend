import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, Home, BookOpen, DollarSign, User } from "lucide-react";
import { isAuthenticated, handleLogout } from "@/auth/auth";
import { useNavigate } from 'react-router-dom';
import { Logo } from "../logo";
import GlassButton from "@/components/glass/GlassButton";
import GlassCard from "@/components/glass/GlassCard";
import { ModeToggle } from "../mode-toggle";

function AppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/docs/installation", label: "Docs", icon: BookOpen },
    { href: "/pricing", label: "Pricing", icon: DollarSign },
    { href: "/about", label: "About", icon: User },
  ];

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 p-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard className="max-w-7xl mx-auto px-6 py-4 bg-black/20" variant="dark">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Logo height={32} width={32} />
              </motion.div>
              <motion.h1 
                className="text-xl font-bold text-neon-cyan"
                animate={{ 
                  textShadow: [
                    "0 0 10px #00ffff",
                    "0 0 20px #00ffff", 
                    "0 0 10px #00ffff"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                FindSafe
              </motion.h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:text-neon-cyan transition-all duration-300 hover:bg-white/10"
                  >
                    <item.icon className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <ModeToggle />
              
              {!isAuthenticated() ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassButton variant="primary" glow>
                    <Link to="/login">Get Started</Link>
                  </GlassButton>
                </motion.div>
              ) : (
                <div className="flex items-center gap-3">
                  <GlassButton variant="ghost">
                    <Link to="/dashboard">Dashboard</Link>
                  </GlassButton>
                  <GlassButton variant="danger" onClick={onLogoutClick}>
                    Logout
                  </GlassButton>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            onClick={toggleMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pt-4 border-t border-white/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-neon-cyan transition-all duration-300 hover:bg-white/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-4 border-t border-white/20 space-y-3">
                  {!isAuthenticated() ? (
                    <GlassButton variant="primary" className="w-full" glow>
                      <Link to="/login">Get Started</Link>
                    </GlassButton>
                  ) : (
                    <div className="space-y-2">
                      <GlassButton variant="ghost" className="w-full">
                        <Link to="/dashboard">Dashboard</Link>
                      </GlassButton>
                      <GlassButton variant="danger" className="w-full" onClick={onLogoutClick}>
                        Logout
                      </GlassButton>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

export default AppBar;