/* eslint-disable react/prop-types */
import { Smartphone, Circle, Edit, Trash2, MapPin, Battery, Wifi, WifiOff } from 'lucide-react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/glass/GlassCard';
import GlassButton from '@/components/glass/GlassButton';
import DeviceModeModal from '@/components/modal/devicemodal';
import DeviceModal from '../modal/alertmodal';
import { useState } from 'react';

const DeviceCard = ({ device, onUpdateSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

  const getStatusColor = (mode) => {
    switch (mode) {
      case 'active':
        return 'text-neon-green bg-green-500/20 border-green-500/30';
      case 'inactive':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'disabled':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (mode) => {
    switch (mode) {
      case 'active':
        return <Wifi className="w-4 h-4" />;
      case 'inactive':
        return <WifiOff className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const formatLastSeen = (lastSeen) => {
    if (!lastSeen) return 'Unknown';
    const now = new Date();
    const diff = now - new Date(lastSeen);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard className="p-6 h-full" variant="secondary" hover>
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getStatusColor(device.mode)} border`}>
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{device.devicename}</h3>
              <p className="text-white/70 text-sm">{device.modelNumber || 'Unknown Model'}</p>
            </div>
          </div>

          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${getStatusColor(device.mode)} border`}>
            {getStatusIcon(device.mode)}
            <span className="text-xs font-medium capitalize">{device.mode}</span>
          </div>
        </div>

        {/* Device Info */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Last Seen:</span>
            <span className="text-white">{formatLastSeen(device.lastSeen)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Battery:</span>
            <div className="flex items-center gap-1">
              <Battery className="w-4 h-4 text-neon-green" />
              <span className="text-white">85%</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Location:</span>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-neon-cyan" />
              <span className="text-white">Available</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-white/10">
          <GlassButton
            variant="secondary"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Edit className="w-4 h-4" />
            Edit
          </GlassButton>

          <GlassButton
            variant="ghost"
            size="sm"
            className="gap-2 text-red-400 hover:text-red-300"
            onClick={() => setIsDeviceModalOpen(true)}
          >
            <Trash2 className="w-4 h-4" />
          </GlassButton>

          <GlassButton
            variant="primary"
            size="sm"
            className="gap-2"
            onClick={() => window.locateDevice && window.locateDevice(device._id)}
          >
            <MapPin className="w-4 h-4" />
            Locate
          </GlassButton>
        </div>
      </GlassCard>

      <DeviceModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        device={device}
        onUpdateSuccess={onUpdateSuccess}
      />
      <DeviceModeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        device={device}
        onUpdateSuccess={onUpdateSuccess}
      />
    </motion.div>
  );
};

export default DeviceCard;