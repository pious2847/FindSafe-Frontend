import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GoogleMaps from "@/components/Maps/GoogleMaps";
import PhoneCard from "@/components/phone/phoneCards";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center text-white p-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-white/70 mb-4">Error: {this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-neon-cyan rounded-lg text-black font-medium"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const UserDashboard = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Global function for locating devices
  useEffect(() => {
    try {
      window.locateDevice = (deviceId) => {
        setSelectedDeviceId(deviceId);
      };

      // Simulate loading time
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => {
        delete window.locateDevice;
        clearTimeout(timer);
      };
    } catch (err) {
      console.error('Dashboard initialization error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white p-8">
          <h2 className="text-2xl font-bold mb-4 text-red-400">Dashboard Error</h2>
          <p className="text-white/70 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-neon-cyan rounded-lg text-black font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <ErrorBoundary>
      <AnimatedBackground variant="dashboard" />

      <motion.div
        className="relative z-10 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6" variant="primary" glow>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome to <span className="text-neon-cyan">FindSafe</span>
                </h1>
                <p className="text-white/70">Monitor and secure your devices in real-time</p>
              </div>
              <div className="text-neon-cyan">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-2 border-neon-cyan/30 border-t-neon-cyan rounded-full"
                />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants}>
          <DashboardStats />
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div
          className="grid grid-cols-1 xl:grid-cols-6 gap-6"
          variants={itemVariants}
        >
          {/* Map Section */}
          <motion.div className="xl:col-span-4">
            <GlassCard className="h-[600px] p-0 overflow-hidden" variant="dark">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
                  Live Device Tracking
                </h2>
              </div>
              <div className="h-[calc(100%-80px)]">
                <GoogleMaps selectedDeviceId={selectedDeviceId} />
              </div>
            </GlassCard>
          </motion.div>

          {/* group device panel and activity panel */}
          <motion.div className="xl:col-span-2 space-y-4">
            {/* Device Panel */}
            <motion.div className="space-y-4">
              <GlassCard className="p-4" variant="secondary">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span>
                  Connected Devices
                </h2>
                <div className="max-h-48 overflow-auto glass-scrollbar">
                  <PhoneCard />
                </div>
              </GlassCard>
            </motion.div>

            {/* Recent Activity Panel */}
            <motion.div className="space-y-4">
              <RecentActivity />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <QuickActions />
        </motion.div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default UserDashboard;