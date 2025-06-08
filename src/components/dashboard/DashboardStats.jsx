import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/glass/GlassCard';
import { analyticsService } from '@/services/analytics';
import { getUserId } from '@/auth/auth';
import {
  Smartphone,
  MapPin,
  Battery,
  AlertTriangle,
  Shield,
  Signal,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalDevices: 0,
    onlineDevices: 0,
    secureDevices: 0,
    lowBattery: 0,
    alerts: 0,
    locations: 0,
    trends: {
      totalDevices: '+0%',
      onlineDevices: '+0%',
      secureDevices: '100%',
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = getUserId();
        if (!userId) {
          throw new Error('User not authenticated - no userId found');
        }

        console.log("============ANALITIC ENDPOINT CALLED=================")
        const response = await analyticsService.getDashboardStats(userId);
        console.log("============ANALITIC ENDPOINT COMPLETES=================",response)

        if (response && response.success) {
          setStats(response.stats);
        } else {
          throw new Error(response?.message || 'Failed to fetch stats');
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(err.message);
        // No fallback data - show error state
      } finally {
        setLoading(false);
      }
    };

    fetchStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      label: 'Total Devices',
      value: stats.totalDevices,
      icon: Smartphone,
      color: 'text-neon-cyan',
      bgColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/30',
      gradient: 'from-cyan-500 to-blue-500',
      trend: stats.trends?.totalDevices || '+0%',
    },
    {
      label: 'Online',
      value: stats.onlineDevices,
      icon: Signal,
      color: 'text-neon-green',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
      gradient: 'from-green-500 to-emerald-500',
      trend: stats.trends?.onlineDevices || '+0%',
    },
    {
      label: 'Secure',
      value: stats.secureDevices,
      icon: Shield,
      color: 'text-neon-purple',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/30',
      gradient: 'from-purple-500 to-violet-500',
      trend: stats.trends?.secureDevices || '100%',
    },
    {
      label: 'Low Battery',
      value: stats.lowBattery,
      icon: Battery,
      color: 'text-neon-orange',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/30',
      gradient: 'from-orange-500 to-red-500',
      trend: stats.lowBattery > 0 ? `${stats.lowBattery} devices` : 'All Good',
    },
    {
      label: 'Active Alerts',
      value: stats.alerts,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30',
      gradient: 'from-red-500 to-pink-500',
      trend: stats.alerts > 0 ? 'Needs Attention' : 'All Clear',
    },
    {
      label: 'Locations Tracked',
      value: stats.locations,
      icon: MapPin,
      color: 'text-neon-pink',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/30',
      gradient: 'from-pink-500 to-rose-500',
      trend: 'Last 24h',
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white/10 rounded-xl p-4 h-24">
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-6 bg-white/20 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
        <p className="text-red-400 text-sm">Error loading stats: {error}</p>
        <p className="text-white/70 text-xs mt-1">Using demo data</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          variants={itemVariants}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
        >
          <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 group cursor-pointer`}>
            <GlassCard
              className={`relative p-4 ${item.bgColor} ${item.borderColor} bg-black/20 backdrop-blur-sm border-0 h-full`}
              hover={false}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="relative">
                  <item.icon className={`text-2xl ${item.color} drop-shadow-lg`} />
                  <motion.div
                    className="absolute -inset-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <motion.div
                    className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')} shadow-lg`}
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className={`text-xs font-medium ${
                    item.trend.startsWith('+') ? 'text-green-400' :
                    item.trend.startsWith('-') ? 'text-red-400' :
                    item.trend.includes('%') ? 'text-blue-400' :
                    'text-white/70'
                  }`}>
                    {item.trend.startsWith('+') && <TrendingUp className="inline w-3 h-3 mr-1" />}
                    {item.trend.startsWith('-') && <TrendingDown className="inline w-3 h-3 mr-1" />}
                    {item.trend}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <motion.div
                  className={`text-2xl font-bold ${item.color} drop-shadow-lg`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  <CountUpAnimation value={item.value} />
                </motion.div>
                <p className="text-white/70 text-sm font-medium">{item.label}</p>
              </div>

              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </GlassCard>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Count up animation component
const CountUpAnimation = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev < value) {
          return prev + 1;
        }
        clearInterval(timer);
        return value;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

export default DashboardStats;
