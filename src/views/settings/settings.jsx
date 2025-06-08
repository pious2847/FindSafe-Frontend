/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPalette,
  FaUser,
  FaBell,
  FaLock,
  FaQuestionCircle,
  FaDatabase,
  FaWifi,
  FaMobile,
  FaChevronRight
} from "react-icons/fa";
import { CiSettings, CiUser } from "react-icons/ci";
import { ModeToggle } from "@/components/mode-toggle";
import { UserModal } from "../../components/modal/usermodal";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import { Shield ,Bell} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general');

  const settingSections = [
    {
      id: 'general',
      title: 'General',
      icon: CiSettings,
      color: 'text-neon-cyan',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/30'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      color: 'text-neon-purple',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      color: 'text-neon-green',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    },
    {
      id: 'account',
      title: 'Account',
      icon: CiUser,
      color: 'text-neon-pink',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/30'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="dashboard" />

      <motion.div
        className="relative z-10 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6" variant="primary" glow>
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/30"
              >
                <CiSettings className="text-2xl text-neon-cyan" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-white/70">Customize your FindSafe experience</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <GlassCard className="p-4" variant="dark">
              <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {settingSections.map((section) => (
                  <motion.button
                    key={section.id}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      activeSection === section.id
                        ? `${section.bgColor} ${section.color} border ${section.borderColor}`
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <section.icon className="text-xl" />
                    <span className="font-medium">{section.title}</span>
                    <FaChevronRight className="ml-auto text-sm" />
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Settings Content */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <GlassCard className="p-6" variant="secondary">
              {activeSection === 'general' && <GeneralSettings />}
              {activeSection === 'security' && <SecuritySettings />}
              {activeSection === 'notifications' && <NotificationSettings />}
              {activeSection === 'account' && <AccountSettings />}
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const GeneralSettings = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>

    <SettingItem
      icon={<FaPalette className="text-xl text-neon-cyan" />}
      title="Appearance"
      description="Customize the look and feel of your dashboard"
      action={<ModeToggle />}
    />

    <SettingItem
      icon={<FaWifi className="text-xl text-neon-green" />}
      title="Connection"
      description="Manage device connection preferences"
      action={<GlassButton variant="ghost" size="sm">Configure</GlassButton>}
    />

    <SettingItem
      icon={<FaDatabase className="text-xl text-neon-purple" />}
      title="Data Sync"
      description="Control how your data is synchronized"
      action={<GlassButton variant="ghost" size="sm">Manage</GlassButton>}
    />
  </div>
);

const SecuritySettings = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

    <SettingItem
      icon={<FaLock className="text-xl text-neon-purple" />}
      title="Two-Factor Authentication"
      description="Add an extra layer of security to your account"
      action={<GlassButton variant="primary" size="sm">Enable</GlassButton>}
    />

    <SettingItem
      icon={<Shield className="text-xl text-neon-cyan" />}
      title="Device Encryption"
      description="Encrypt data stored on your devices"
      action={<GlassButton variant="success" size="sm">Active</GlassButton>}
    />

    <SettingItem
      icon={<FaMobile className="text-xl text-neon-green" />}
      title="Trusted Devices"
      description="Manage devices that can access your account"
      action={<GlassButton variant="ghost" size="sm">View</GlassButton>}
    />
  </div>
);

const NotificationSettings = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>

    <SettingItem
      icon={<FaBell className="text-xl text-neon-green" />}
      title="Push Notifications"
      description="Receive real-time alerts on your devices"
      action={<GlassButton variant="success" size="sm">Enabled</GlassButton>}
    />

    <SettingItem
      icon={<FaBell className="text-xl text-neon-orange" />}
      title="Security Alerts"
      description="Get notified about security events"
      action={<GlassButton variant="danger" size="sm">Critical Only</GlassButton>}
    />

    <SettingItem
      icon={<FaBell className="text-xl text-neon-purple" />}
      title="Device Status"
      description="Notifications about device connectivity"
      action={<GlassButton variant="secondary" size="sm">Configure</GlassButton>}
    />
  </div>
);

const AccountSettings = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>

    <SettingItem
      icon={<FaUser className="text-xl text-neon-pink" />}
      title="Profile Information"
      description="Update your personal information"
      action={<UserModal />}
    />

    <SettingItem
      icon={<FaQuestionCircle className="text-xl text-neon-cyan" />}
      title="Help & Support"
      description="Get assistance or report an issue"
      action={<GlassButton variant="ghost" size="sm">Contact</GlassButton>}
    />

    <SettingItem
      icon={<FaLock className="text-xl text-red-400" />}
      title="Delete Account"
      description="Permanently delete your account and data"
      action={<GlassButton variant="danger" size="sm">Delete</GlassButton>}
    />
  </div>
);

const SettingItem = ({ icon, title, description, action }) => (
  <motion.div
    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
    whileHover={{ scale: 1.01 }}
  >
    <div className="flex items-center space-x-4">
      <div className="p-2 rounded-lg bg-white/10">{icon}</div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
    <div className="relative">{action}</div>
  </motion.div>
);

export default SettingsPage;