import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/glass/GlassCard';
import { analyticsService } from '@/services/analytics';
import { getUserId } from '@/auth/auth';
import {
  Activity,
  Smartphone,
  MapPin,
  Shield,
  Battery,
  AlertTriangle,
  User,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  RefreshCw
} from 'lucide-react';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real activity data from backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = getUserId();
        if (!userId) {
          throw new Error('User not authenticated - no userId found');
        }

        const response = await analyticsService.getRecentActivity(userId, 10);
        console.log("REcent activiti response", response)
        if (response && response.success) {
          setActivities(response.activities);
        } else {
          throw new Error(response?.message || 'Failed to fetch activities');
        }
      } catch (err) {
        console.error('Error fetching recent activity:', err);
        setError(err.message);
        // No fallback data - show error state
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    // Refresh activities every 60 seconds
    const interval = setInterval(fetchActivities, 60000);
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'device_connected': return Smartphone;
      case 'location_update': return MapPin;
      case 'security_alert': return Shield;
      case 'battery_low': return Battery;
      case 'profile_update': return User;
      case 'system_update': return Zap;
      default: return Activity;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'warning': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'error': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'info': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return XCircle;
      case 'info': return Info;
      default: return Clock;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.status === filter
  );

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <GlassCard className="p-6" variant="dark">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
          Recent Activity
        </h3>
        
        {/* Filter buttons */}
        <div className="flex gap-2">
          {['all', 'success', 'warning', 'info'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                filter === filterType
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="space-y-3 max-h-48 overflow-auto glass-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity) => {
            const StatusIcon = getStatusIcon(activity.status);
            const ActivityIcon = getActivityIcon(activity.type);

            return (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="group"
              >
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <div className={`p-2 rounded-lg ${getStatusColor(activity.status)} flex-shrink-0`}>
                    <ActivityIcon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white font-medium text-sm truncate">
                        {activity.title}
                      </h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <StatusIcon className={`w-3 h-3 ${getStatusColor(activity.status).split(' ')[0]}`} />
                        <span className="text-white/50 text-xs">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-xs mb-1 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-white/50 text-xs">
                        Device: {activity.device}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/50 text-sm">No activities found for this filter</p>
          </div>
        )}
      </motion.div>
    </GlassCard>
  );
};

export default RecentActivity;
