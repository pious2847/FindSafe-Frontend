import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone, MapPin } from "lucide-react";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import { Shield } from 'lucide-react';

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content */}
        <motion.div className="space-y-8" variants={itemVariants}>
          <motion.div className="space-y-6">
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="block text-white">Secure Your</span>
              <motion.span
                className="block text-neon-cyan"
                animate={{
                  textShadow: [
                    "0 0 20px #00ffff",
                    "0 0 40px #00ffff",
                    "0 0 20px #00ffff"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Digital Life
              </motion.span>
              <span className="block text-white">with</span>
              <motion.span
                className="block text-neon-purple"
                animate={{
                  textShadow: [
                    "0 0 20px #8b5cf6",
                    "0 0 40px #8b5cf6",
                    "0 0 20px #8b5cf6"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                FindSafe
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              Advanced device tracking and security platform powered by cutting-edge technology.
              Protect, locate, and secure your devices with military-grade encryption and real-time monitoring.
            </motion.p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            {[
              { icon: Shield, text: "Military-Grade Security", color: "text-neon-green" },
              { icon: MapPin, text: "Real-Time Tracking", color: "text-neon-cyan" },
              { icon: Smartphone, text: "Multi-Device Support", color: "text-neon-purple" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className={`text-lg ${feature.color}`} />
                <span className="text-white/90 text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <GlassButton
              variant="primary"
              size="lg"
              className="gap-3 px-8 py-4 text-lg"
              glow={true}
            >
              <Download className="text-xl" />
              Download APK
            </GlassButton>

            <GlassButton
              variant="ghost"
              size="lg"
              className="gap-3 px-8 py-4 text-lg"
            >
              <Shield className="text-xl" />
              Learn More
            </GlassButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 pt-8"
            variants={itemVariants}
          >
            {[
              { number: "10K+", label: "Active Users" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  className="text-2xl font-bold text-neon-cyan mb-1"
                  animate={{
                    textShadow: [
                      "0 0 10px #00ffff",
                      "0 0 20px #00ffff",
                      "0 0 10px #00ffff"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Device Mockup */}
        <motion.div
          className="relative flex justify-center items-center"
          variants={itemVariants}
        >
          <motion.div
            className="relative"
            variants={floatingVariants}
            animate="animate"
          >
            {/* Main Device */}
            <GlassCard className="p-8 w-80 h-96 relative overflow-hidden" variant="primary" glow>
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20" />

              {/* Device Screen */}
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 bg-black/50 rounded-lg p-4 border border-white/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                      <span className="text-white text-sm">Device Online</span>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2 bg-neon-cyan/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-neon-cyan rounded-full"
                          animate={{ width: ["0%", "85%"] }}
                          transition={{ duration: 2, delay: 1 }}
                        />
                      </div>
                      <span className="text-white/70 text-xs">Battery: 85%</span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-white/70 text-xs">Location Accuracy</div>
                      <div className="text-neon-green text-sm font-medium">±3 meters</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="text-white font-medium">iPhone 14 Pro</div>
                  <div className="text-white/70 text-sm">Protected by FindSafe</div>
                </div>
              </div>
            </GlassCard>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-neon-green/20 rounded-full border border-neon-green/30 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="text-2xl text-neon-green" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-neon-purple/20 rounded-full border border-neon-purple/30 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="text-lg text-neon-purple" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;
