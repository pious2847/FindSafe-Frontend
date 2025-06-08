import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Bell,
  User,
  Smartphone,
  MapPin,
  Settings,
  Map,
  Search,
  Plus,
  Activity,
  AlertTriangle,
  Zap
} from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'View Devices',
      description: 'Manage your devices',
      icon: Smartphone,
      color: 'primary',
      onClick: () => navigate('/dashboard/devices'),
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'View Locations',
      description: 'Track device locations',
      icon: MapPin,
      color: 'secondary',
      onClick: () => navigate('/dashboard/locations'),
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Security Settings',
      description: 'Configure security',
      icon: Shield,
      color: 'success',
      onClick: () => navigate('/dashboard/settings'),
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Profile',
      description: 'Manage your profile',
      icon: User,
      color: 'default',
      onClick: () => navigate('/dashboard/profile'),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Device Search',
      description: 'Find your devices',
      icon: Search,
      color: 'primary',
      onClick: () => navigate('/dashboard/devices'),
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Activity Log',
      description: 'View recent activity',
      icon: Activity,
      color: 'secondary',
      onClick: () => navigate('/dashboard/locations'),
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  const quickStats = [
    {
      label: 'Last Location Update',
      value: '2 minutes ago',
      icon: Map,
      status: 'online',
    },
    {
      label: 'Security Status',
      value: 'All Secure',
      icon: Shield,
      status: 'secure',
    },
    {
      label: 'Notifications',
      value: '3 New',
      icon: Bell,
      status: 'warning',
    },
    {
      label: 'Device Search',
      value: 'Available',
      icon: Search,
      status: 'ready',
    },
    {
      label: 'System Performance',
      value: '98% Uptime',
      icon: Zap,
      status: 'excellent',
    },
    {
      label: 'Active Alerts',
      value: '1 Critical',
      icon: AlertTriangle,
      status: 'critical',
    },
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
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="lg:col-span-2">
        <GlassCard className="p-6" variant="primary">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {actions.map((action) => (
              <motion.div
                key={action.title}
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${action.gradient} p-0.5 cursor-pointer`}
                  onClick={action.onClick}
                >
                  <div className="relative bg-black/20 backdrop-blur-sm rounded-xl p-4 h-28 flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 group-hover:bg-black/10">
                    <action.icon className="text-2xl text-white drop-shadow-lg" />
                    <div>
                      <div className="font-medium text-sm text-white">{action.title}</div>
                      <div className="text-xs text-white/80">{action.description}</div>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* System Status */}
      <motion.div variants={itemVariants}>
        <GlassCard className="p-6" variant="secondary">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span>
            System Status
          </h3>

          <div className="space-y-3">
            {quickStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 p-3 group cursor-pointer"
                variants={itemVariants}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(stat.status)} transition-all duration-300 group-hover:scale-110`}>
                      <stat.icon className="text-lg" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{stat.label}</div>
                      <div className="text-white/70 text-xs">{stat.value}</div>
                    </div>
                  </div>

                  <motion.div
                    className={`w-3 h-3 rounded-full ${getStatusIndicator(stat.status)} shadow-lg`}
                    animate={{
                      opacity: [1, 0.3, 1],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case 'online': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'secure': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'warning': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'ready': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'excellent': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getStatusIndicator = (status) => {
  switch (status) {
    case 'online': return 'bg-green-400 shadow-green-400/50';
    case 'secure': return 'bg-blue-400 shadow-blue-400/50';
    case 'warning': return 'bg-orange-400 shadow-orange-400/50';
    case 'ready': return 'bg-purple-400 shadow-purple-400/50';
    case 'excellent': return 'bg-emerald-400 shadow-emerald-400/50';
    case 'critical': return 'bg-red-400 shadow-red-400/50';
    default: return 'bg-gray-400 shadow-gray-400/50';
  }
};

export default QuickActions;
