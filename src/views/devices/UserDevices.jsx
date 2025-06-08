import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DeviceCardPage from "@/components/phone/DevicesCard";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import {
  Smartphone,
  Search,
  Grid3X3,
  List,
  Filter,
  RefreshCw
} from 'lucide-react';

const UserDevices = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [devices, setDevices] = useState([]);
    const [deviceStats, setDeviceStats] = useState([
        { label: 'Total Devices', value: '0', color: 'text-neon-cyan', bg: 'bg-cyan-500/20' },
        { label: 'Online', value: '0', color: 'text-neon-green', bg: 'bg-green-500/20' },
        { label: 'Offline', value: '0', color: 'text-red-400', bg: 'bg-red-500/20' },
        { label: 'Low Battery', value: '0', color: 'text-neon-orange', bg: 'bg-orange-500/20' },
    ]);

    // Update stats when devices change
    useEffect(() => {
        if (devices.length > 0) {
            const online = devices.filter(device => device.mode === 'active').length;
            const offline = devices.filter(device => device.mode === 'inactive').length;
            const warning = devices.filter(device => device.mode === 'disabled').length;

            setDeviceStats([
                { label: 'Total Devices', value: devices.length.toString(), color: 'text-neon-cyan', bg: 'bg-cyan-500/20' },
                { label: 'Online', value: online.toString(), color: 'text-neon-green', bg: 'bg-green-500/20' },
                { label: 'Offline', value: offline.toString(), color: 'text-red-400', bg: 'bg-red-500/20' },
                { label: 'Warning', value: warning.toString(), color: 'text-neon-orange', bg: 'bg-orange-500/20' },
            ]);
        }
    }, [devices]);

    const handleDevicesUpdate = (newDevices) => {
        setDevices(newDevices);
    };

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
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="p-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/30"
                                >
                                    <Smartphone className="text-2xl text-neon-cyan" />
                                </motion.div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">My Devices</h1>
                                    <p className="text-white/70">Manage and monitor your connected devices</p>
                                </div>
                            </div>

                            <GlassButton
                                variant="secondary"
                                className="gap-2"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCw className="text-lg" />
                                Refresh Devices
                            </GlassButton>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Stats */}
                <motion.div variants={itemVariants}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {deviceStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                custom={index}
                            >
                                <GlassCard className={`p-4 ${stat.bg} border-white/20`} hover>
                                    <div className="text-center">
                                        <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                                            {stat.value}
                                        </div>
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
                            {/* Search */}
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-lg" />
                                    <input
                                        type="text"
                                        placeholder="Search devices..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-neon-cyan/50 focus:bg-white/15 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Filters and View */}
                            <div className="flex items-center gap-3">
                                {/* Filter */}
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-neon-cyan/50"
                                >
                                    <option value="all">All Devices</option>
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                    <option value="warning">Warning</option>
                                </select>

                                {/* View Mode */}
                                <div className="flex bg-white/10 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded transition-all ${
                                            viewMode === 'grid'
                                                ? 'bg-neon-cyan/20 text-neon-cyan'
                                                : 'text-white/70 hover:text-white'
                                        }`}
                                    >
                                        <Grid3X3 className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded transition-all ${
                                            viewMode === 'list'
                                                ? 'bg-neon-cyan/20 text-neon-cyan'
                                                : 'text-white/70 hover:text-white'
                                        }`}
                                    >
                                        <List className="text-lg" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Devices Grid */}
                <motion.div variants={itemVariants} >
                    <GlassCard className="p-6" variant="secondary">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span>
                            Connected Devices
                        </h2>

                            <DeviceCardPage
                                viewMode={viewMode}
                                searchTerm={searchTerm}
                                filterStatus={filterStatus}
                                onDevicesUpdate={handleDevicesUpdate}
                            />
                    </GlassCard>
                </motion.div>

                {/* Quick Actions */}
                <motion.div variants={itemVariants}>
                    <GlassCard className="p-6" variant="primary">
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <GlassButton variant="success" size="sm" className="flex-col h-16 gap-1">
                                <span className="text-lg">🔊</span>
                                <span className="text-xs">Ring All</span>
                            </GlassButton>
                            <GlassButton variant="secondary" size="sm" className="flex-col h-16 gap-1">
                                <span className="text-lg">🔒</span>
                                <span className="text-xs">Lock All</span>
                            </GlassButton>
                            <GlassButton variant="primary" size="sm" className="flex-col h-16 gap-1">
                                <span className="text-lg">📍</span>
                                <span className="text-xs">Locate All</span>
                            </GlassButton>
                            <GlassButton variant="ghost" size="sm" className="flex-col h-16 gap-1">
                                <span className="text-lg">🔄</span>
                                <span className="text-xs">Sync All</span>
                            </GlassButton>
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default UserDevices;