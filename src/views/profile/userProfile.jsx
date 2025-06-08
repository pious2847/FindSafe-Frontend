/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUser } from "@/auth/auth";
import { UserModal } from "../../components/modal/usermodal";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  Edit,
  Calendar,
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  Camera,
  Settings,
  Activity,
  Clock
} from 'lucide-react';

const UserProfile = () => {
  const { user } = getUser();
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState(user);

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

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  // Update profile data when user changes
  useEffect(() => {
    setProfileData(user);
  }, [user]);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="dashboard" />

      <motion.div
        className="relative z-10 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <GlassCard className="relative overflow-hidden" variant="primary" glow>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10" />

            <div className="relative p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Image */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-32 h-32 rounded-full border-4 border-neon-cyan/50 overflow-hidden bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 backdrop-blur-md">
                    <img
                      src={profileData?.profilePicture || '/default-avatar.png'}
                      className="w-full h-full object-cover"
                      alt="Profile"
                      onError={(e) => {
                        e.target.src = '/default-avatar.png';
                      }}
                    />
                  </div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-neon-purple/20 rounded-full border-2 border-neon-purple/50 flex items-center justify-center cursor-pointer hover:bg-neon-purple/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="w-4 h-4 text-neon-purple" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon-green rounded-full border-2 border-white/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 bg-neon-green rounded-full" />
                  </motion.div>
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h1
                    className="text-3xl font-bold text-white mb-2"
                    animate={{
                      textShadow: [
                        "0 0 10px #00ffff",
                        "0 0 20px #00ffff",
                        "0 0 10px #00ffff"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {profileData?.name || 'User Name'}
                  </motion.h1>
                  <p className="text-neon-cyan text-lg mb-4">{profileData?.email || 'user@example.com'}</p>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-neon-green/20 border border-neon-green/30 rounded-full text-neon-green text-sm flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                    <span className="px-3 py-1 bg-neon-purple/20 border border-neon-purple/30 rounded-full text-neon-purple text-sm flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Premium
                    </span>
                    <span className="px-3 py-1 bg-neon-cyan/20 border border-neon-cyan/30 rounded-full text-neon-cyan text-sm flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Secure
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <UserModal />
                  <GlassButton variant="ghost" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </GlassButton>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-2" variant="dark">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="text-lg" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          {activeTab === 'personal' && <PersonalInfo user={profileData} />}
          {activeTab === 'security' && <SecurityInfo />}
          {activeTab === 'activity' && <ActivityInfo />}
        </motion.div>
      </motion.div>
    </div>
  );
};

const PersonalInfo = ({ user }) => (
  <GlassCard className="p-6" variant="secondary">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <User className="text-neon-purple w-6 h-6" />
      Personal Information
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoItem
        icon={<User className="text-neon-cyan w-5 h-5" />}
        label="Full Name"
        value={user?.name}
      />
      <InfoItem
        icon={<Mail className="text-neon-green w-5 h-5" />}
        label="Email Address"
        value={user?.email}
      />
      <InfoItem
        icon={<Phone className="text-neon-purple w-5 h-5" />}
        label="Phone Number"
        value={user?.phone}
      />
      <InfoItem
        icon={<MapPin className="text-neon-pink w-5 h-5" />}
        label="Residential Area"
        value={user?.addressinfo?.area}
      />
      <InfoItem
        icon={<Home className="text-neon-orange w-5 h-5" />}
        label="House Number"
        value={user?.addressinfo?.houseNo}
      />
      <InfoItem
        icon={<User className="text-neon-cyan w-5 h-5" />}
        label="Emergency Contact"
        value={user?.emergencycontact?.name}
      />
      <InfoItem
        icon={<Phone className="text-neon-green w-5 h-5" />}
        label="Emergency Phone"
        value={user?.emergencycontact?.contact}
      />
    </div>
  </GlassCard>
);

const SecurityInfo = () => (
  <GlassCard className="p-6" variant="primary">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <Shield className="text-neon-cyan w-6 h-6" />
      Security Settings
    </h2>

    <div className="space-y-4">
      <SecurityItem
        title="Two-Factor Authentication"
        status="Enabled"
        statusColor="text-neon-green"
        description="Your account is protected with 2FA"
      />
      <SecurityItem
        title="Login Notifications"
        status="Active"
        statusColor="text-neon-cyan"
        description="Get notified of new login attempts"
      />
      <SecurityItem
        title="Device Encryption"
        status="Enabled"
        statusColor="text-neon-green"
        description="All your devices are encrypted"
      />
      <SecurityItem
        title="Password Strength"
        status="Strong"
        statusColor="text-neon-purple"
        description="Last updated 30 days ago"
      />
    </div>
  </GlassCard>
);

const ActivityInfo = () => (
  <GlassCard className="p-6" variant="dark">
    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
      <Activity className="text-neon-green w-6 h-6" />
      Recent Activity
    </h2>

    <div className="space-y-4">
      <ActivityItem
        action="Device Connected"
        device="iPhone 14 Pro"
        time="2 minutes ago"
        status="success"
      />
      <ActivityItem
        action="Location Updated"
        device="Samsung Galaxy"
        time="15 minutes ago"
        status="info"
      />
      <ActivityItem
        action="Security Alert"
        device="iPad Pro"
        time="1 hour ago"
        status="warning"
      />
      <ActivityItem
        action="Profile Updated"
        device="Web Dashboard"
        time="2 hours ago"
        status="success"
      />
    </div>
  </GlassCard>
);

const InfoItem = ({ icon, label, value }) => (
  <motion.div
    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <span className="text-sm font-medium text-white/70">{label}</span>
    </div>
    <span className="text-lg text-white font-medium">{value || 'Not provided'}</span>
  </motion.div>
);

const SecurityItem = ({ title, status, statusColor, description }) => (
  <motion.div
    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
    whileHover={{ scale: 1.01 }}
  >
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/70">{description}</p>
    </div>
    <span className={`font-medium ${statusColor}`}>{status}</span>
  </motion.div>
);

const ActivityItem = ({ action, device, time, status }) => {
  const statusColors = {
    success: 'text-neon-green',
    info: 'text-neon-cyan',
    warning: 'text-neon-orange',
    error: 'text-red-400'
  };

  return (
    <motion.div
      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
      whileHover={{ scale: 1.01 }}
    >
      <div className={`w-3 h-3 rounded-full ${statusColors[status]?.replace('text-', 'bg-')}`} />
      <div className="flex-1">
        <h3 className="font-semibold text-white">{action}</h3>
        <p className="text-sm text-white/70">{device}</p>
      </div>
      <span className="text-sm text-white/50">{time}</span>
    </motion.div>
  );
};

export default UserProfile;