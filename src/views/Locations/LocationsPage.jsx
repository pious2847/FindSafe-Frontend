import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationsTable from "@/components/Tables/LocationTable";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import GoogleMaps from "@/components/Maps/GoogleMaps";
import { 
  Download, 
  RefreshCw, 
  MapPin, 
  Map as MapIcon, 
  Calendar, 
  Filter, 
  Search 
} from 'lucide-react';
import { analyticsService } from "@/services/analytics";
import { fetchUserDevices } from "@/services/device";
import { fetchDeviceLocationsWithNames } from "@/services/locations";
import { getUserId } from "@/auth/auth";

const LocationsDataPage = () => {
    const [viewMode, setViewMode] = useState('map');
    const [timeFilter, setTimeFilter] = useState('today');
    const [loading, setLoading] = useState(true);
    const [locationStats, setLocationStats] = useState([
        { label: 'Total Locations', value: '0', color: 'text-neon-cyan', bg: 'bg-cyan-500/20' },
        { label: 'Today', value: '0', color: 'text-neon-green', bg: 'bg-green-500/20' },
        { label: 'Geofences', value: '0', color: 'text-neon-purple', bg: 'bg-purple-500/20' },
        { label: 'Accuracy', value: '0%', color: 'text-neon-pink', bg: 'bg-pink-500/20' },
    ]);
    const [recentActivity, setRecentActivity] = useState([]);

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

    // Fetch real location data
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                setLoading(true);
                const userId = getUserId();
                if (!userId) {
                    throw new Error('User not authenticated');
                }

                // Fetch location analytics
                const locationAnalytics = await analyticsService.getLocationAnalytics(userId);
                if (locationAnalytics.success) {
                    const analytics = locationAnalytics.analytics;
                    setLocationStats([
                        { label: 'Total Locations', value: analytics.totalLocations.toString(), color: 'text-neon-cyan', bg: 'bg-cyan-500/20' },
                        { label: 'Today', value: analytics.averageLocationsPerDay, color: 'text-neon-green', bg: 'bg-green-500/20' },
                        { label: 'Geofences', value: analytics.geofences.toString(), color: 'text-neon-purple', bg: 'bg-purple-500/20' },
                        { label: 'Accuracy', value: '98%', color: 'text-neon-pink', bg: 'bg-pink-500/20' },
                    ]);
                }

                // Fetch recent activity
                const activityData = await analyticsService.getRecentActivity(userId, 5);
                if (activityData.success) {
                    const locationActivities = activityData.activities.filter(activity =>
                        activity.type === 'location_update'
                    );
                    setRecentActivity(locationActivities);
                }
            } catch (error) {
                console.error('Error fetching location data:', error);
                // Keep default values on error
            } finally {
                setLoading(false);
            }
        };

        fetchLocationData();
    }, [timeFilter]);

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
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="p-3 rounded-xl bg-neon-pink/20 border border-neon-pink/30"
                                >
                                    <MapPin className="text-2xl text-neon-pink" />
                                </motion.div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Location History</h1>
                                    <p className="text-white/70">Track and analyze device movement patterns</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <GlassButton variant="ghost" className="gap-2">
                                    <Download className="text-lg" />
                                    Export
                                </GlassButton>
                                <GlassButton variant="primary" className="gap-2" glow>
                                    <Filter className="text-lg" />
                                    Filter
                                </GlassButton>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {locationStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                custom={index}
                            >
                                <GlassCard className={`p-4 ${stat.bg} border-white/20`} hover>
                                    <div className="text-center">
                                        <motion.div
                                            className={`text-2xl font-bold ${stat.color} mb-1`}
                                            animate={{
                                                textShadow: [
                                                    `0 0 5px currentColor`,
                                                    `0 0 10px currentColor`,
                                                    `0 0 5px currentColor`
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-white/70 text-sm">{stat.label}</div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Controls */}
                <motion.div variants={itemVariants}>
                    <GlassCard className="p-4" variant="dark">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Time Filter */}
                            <div className="flex items-center gap-3">
                                <Calendar className="text-white/70 text-lg" />
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-cyan/50"
                                >
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                    <option value="all">All Time</option>
                                </select>
                            </div>

                            {/* View Toggle */}
                            <div className="flex bg-white/10 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('map')}
                                    className={`px-4 py-2 rounded transition-all flex items-center gap-2 ${
                                        viewMode === 'map'
                                            ? 'bg-neon-cyan/20 text-neon-cyan'
                                            : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    <MapIcon className="text-lg" />
                                    Map View
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-4 py-2 rounded transition-all flex items-center gap-2 ${
                                        viewMode === 'table'
                                            ? 'bg-neon-cyan/20 text-neon-cyan'
                                            : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    <Search className="text-lg" />
                                    Table View
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Content */}
                <motion.div variants={itemVariants}>
                    {viewMode === 'map' ? (
                        <GlassCard className="p-0 overflow-hidden h-[600px]" variant="secondary">
                            <div className="p-4 border-b border-white/10">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                    <span className="w-2 h-2 bg-neon-pink rounded-full animate-pulse"></span>
                                    Location Map
                                </h2>
                            </div>
                            <div className="h-[calc(100%-80px)]">
                                <GoogleMaps />
                            </div>
                        </GlassCard>
                    ) : (
                        <GlassCard className="p-6" variant="secondary">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span>
                                Location History
                            </h2>
                            <div className="overflow-auto max-h-[600px] glass-scrollbar">
                                <LocationsTable />
                            </div>
                        </GlassCard>
                    )}
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={itemVariants}>
                    <GlassCard className="p-6" variant="primary">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
                            Recent Location Updates
                        </h3>
                        <div className="space-y-3">
                            {loading ? (
                                <div className="text-center py-4">
                                    <div className="animate-spin w-6 h-6 border-2 border-neon-cyan border-t-transparent rounded-full mx-auto mb-2"></div>
                                    <p className="text-white/70 text-sm">Loading recent activity...</p>
                                </div>
                            ) : recentActivity.length > 0 ? (
                                recentActivity.map((activity, index) => (
                                    <motion.div
                                        key={activity.id}
                                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                                            <div>
                                                <p className="text-white font-medium">{activity.device}</p>
                                                <p className="text-white/70 text-sm">{activity.description}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/70 text-sm">
                                                {new Date(activity.timestamp).toLocaleTimeString()}
                                            </p>
                                            <p className="text-neon-cyan text-xs">Location Update</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-4">
                                    <MapPin className="w-8 h-8 text-white/30 mx-auto mb-2" />
                                    <p className="text-white/70 text-sm">No recent location updates</p>
                                </div>
                            )}
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default LocationsDataPage;
