/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Volume2,
  Shield,
  MapPin,
  Smartphone,
  Battery,
  Wifi
} from "lucide-react";
import { Button } from "../ui/button";
import { fetchUserDevices } from "@/services/device";
import { getUserId } from "@/auth/auth";
import { useWebSocketCommand } from "@/services/websocketUtils";
import Toast from "@/components/toastmsg";
import { Loader } from "@/components/loader";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";



const PhoneCard = () => {
    const [phones, setPhones] = useState([]);
    const { sendCommandToDevice, readyState,lastMessage } = useWebSocketCommand();
    const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

   const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };
    const handleSendCommand = (deviceId, command) => {
      setShowToast(false);
      if (readyState === WebSocket.OPEN) {
        sendCommandToDevice(deviceId, command);
        triggerToast( `Alarm command sent successfully !!!`, 'success')
      } else {
        console.log('WebSocket is not connected');
      triggerToast(`Alarm command fail refresh the page !!! `, 'danger')
      }
    };

    const handleLocateDevice = (deviceId) => {
      // Trigger map to focus on this device
      if (window.locateDevice) {
        window.locateDevice(deviceId);
      }

      // Show success message
      if (window.showToast) {
        window.showToast('Locating device on map...', 'info', 3000);
      }
    };
    useEffect(() => {
      if (lastMessage !== null) {
        console.log('Received message:', lastMessage.data);
      }
    }, [lastMessage]);

    useEffect(() => {
      const fetchData = async () => {
        const userId = getUserId();
        const fetchedPhones = await fetchUserDevices(userId);
        setPhones(fetchedPhones);
      };
  
      fetchData();
    }, []); 
    

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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const getStatusColor = (mode) => {
    switch (mode?.toLowerCase()) {
      case 'active': return { color: 'text-neon-green', bg: 'bg-green-500/20', border: 'border-green-500/30' };
      case 'inactive': return { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
      case 'sleep': return { color: 'text-neon-orange', bg: 'bg-orange-500/20', border: 'border-orange-500/30' };
      default: return { color: 'text-white/70', bg: 'bg-white/5', border: 'border-white/20' };
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
        />
      )}

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {phones && phones.length > 0 ? (
            phones.map((phone, index) => {
              const status = getStatusColor(phone.mode);
              return (
                <motion.div
                  key={phone._id}
                  variants={itemVariants}
                  layout
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                >
                  <GlassCard
                    className={`p-0 overflow-hidden ${status.bg} ${status.border}`}
                    hover={true}
                  >
                    <Accordion type="single" collapsible>
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <AccordionTrigger className="hover:no-underline p-4">
                          <div className="flex items-center gap-4 w-full">
                            {/* Device Image */}
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <img
                                src={phone.image}
                                alt={phone.devicename}
                                className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-lg"
                              />
                              <motion.div
                                className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${status.color.replace('text-', 'bg-')}`}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </motion.div>

                            {/* Device Info */}
                            <div className="flex-1 text-left">
                              <h4 className="text-white font-semibold text-lg">{phone.devicename}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-sm font-medium ${status.color}`}>
                                  {phone.mode}
                                </span>
                                <span className="text-white/50 text-xs">•</span>
                                <span className="text-white/70 text-xs flex items-center gap-1">
                                  <Wifi className="text-sm" />
                                  Connected
                                </span>
                              </div>
                            </div>

                            {/* Status Indicators */}
                            <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-2">
                                <Battery className="text-neon-green text-lg" />
                                <span className="text-white/70 text-xs">85%</span>
                              </div>
                              <div className="text-white/50 text-xs">2 min ago</div>
                            </div>
                          </div>
                        </AccordionTrigger>

                        <AccordionContent className="p-0">
                          <motion.div
                            className="p-4 border-t border-white/10 bg-black/20"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="grid grid-cols-1 gap-3">
                              <GlassButton
                                variant="primary"
                                size="sm"
                                className="justify-start gap-3"
                                onClick={() => handleSendCommand(phone._id, 'play_alarm')}
                                glow={true}
                              >
                                <Volume2 className="text-lg" />
                                <span>Play Alarm</span>
                              </GlassButton>

                              <GlassButton
                                variant="secondary"
                                size="sm"
                                className="justify-start gap-3"
                                onClick={() => handleSendCommand(phone._id, 'lock_device')}
                              >
                                <Shield className="text-lg" />
                                <span>Lock Device</span>
                              </GlassButton>

                              {/* add a propmt verification for wipe command since it a none reversable command */}
                              <GlassButton
                                variant="danger"
                                size="sm"
                                className="justify-start gap-3"
                                onClick={() => handleSendCommand(phone._id, 'wipe_data')}
                              >
                                <Smartphone className="text-lg" />
                                <span>Wipe Device</span>
                              </GlassButton>

                              <GlassButton
                                variant="success"
                                size="sm"
                                className="justify-start gap-3"
                                onClick={() => handleLocateDevice(phone._id)}
                              >
                                <MapPin className="text-lg" />
                                <span>Locate Device</span>
                              </GlassButton>
                            </div>
                          </motion.div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </GlassCard>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="flex w-full items-center justify-center h-64 flex-col gap-4"
              variants={itemVariants}
            >
              <GlassCard className="p-8 text-center bg-white/5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-4"
                >
                  <Loader size={40} />
                </motion.div>
                <p className="text-white/70 text-lg">Searching for devices...</p>
                <p className="text-white/50 text-sm mt-2">Please wait while we scan for connected devices</p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default PhoneCard;
