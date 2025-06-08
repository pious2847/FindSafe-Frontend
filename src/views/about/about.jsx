import React from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import {
  CiLocationOn,
  CiMobile1,
  CiLock,
  CiUser,
  CiStar,
  CiHeart
} from "react-icons/ci";
import { Shield } from 'lucide-react';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground variant="default" />
      <AppBar />

      <motion.div
        className="relative z-10 pt-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          className="px-4 py-20 mx-auto max-w-7xl"
          variants={itemVariants}
        >
          <GlassCard className="p-12 text-center" variant="primary" glow>
            <motion.div
              className="mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-20 h-20 mx-auto bg-neon-cyan/20 rounded-full border border-neon-cyan/30 flex items-center justify-center">
                <Shield className="text-4xl text-neon-cyan" />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              animate={{
                textShadow: [
                  "0 0 20px #00ffff",
                  "0 0 40px #00ffff",
                  "0 0 20px #00ffff"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white">About</span>{" "}
              <span className="text-neon-cyan">FindSafe</span>
            </motion.h1>

            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Discover the story behind FindSafe, a cutting-edge device security platform
              powered by advanced AI and military-grade encryption, designed to protect
              what matters most to you.
            </p>
          </GlassCard>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div
          className="px-4 py-20 mx-auto max-w-7xl"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="p-8" variant="secondary">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neon-purple/20 rounded-xl border border-neon-purple/30">
                  <CiHeart className="text-2xl text-neon-purple" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                At FindSafe, our mission is to empower individuals and families with
                cutting-edge technology that provides unparalleled peace of mind. We believe
                in leveraging AI-driven innovation and military-grade security to create
                a safer digital world for everyone.
              </p>
            </GlassCard>

            <GlassCard className="p-8" variant="primary">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-neon-cyan/20 rounded-xl border border-neon-cyan/30">
                  <CiStar className="text-2xl text-neon-cyan" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                To become the world's most trusted device security platform, where advanced
                technology meets human-centered design. We envision a future where digital
                security is seamless, intelligent, and accessible to everyone.
              </p>
            </GlassCard>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="px-4 py-20 mx-auto max-w-7xl"
          variants={itemVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Advanced Security Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover the cutting-edge technologies that make FindSafe the most
              comprehensive device security platform available today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CiLocationOn,
                title: "Real-time Tracking",
                description: "Military-grade GPS tracking with sub-meter accuracy and real-time location updates.",
                color: "text-neon-cyan",
                bgColor: "bg-cyan-500/20",
                borderColor: "border-cyan-500/30"
              },
              {
                icon: CiLock,
                title: "Remote Device Lock",
                description: "Instantly secure your device with biometric locks and encrypted access controls.",
                color: "text-neon-purple",
                bgColor: "bg-purple-500/20",
                borderColor: "border-purple-500/30"
              },
              {
                icon: Shield,
                title: "Data Protection",
                description: "Advanced encryption and secure data wiping to protect your sensitive information.",
                color: "text-neon-green",
                bgColor: "bg-green-500/20",
                borderColor: "border-green-500/30"
              },
              {
                icon: CiMobile1,
                title: "Smart Alerts",
                description: "AI-powered notifications and customizable alarm systems for enhanced security.",
                color: "text-neon-pink",
                bgColor: "bg-pink-500/20",
                borderColor: "border-pink-500/30"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard
                  className={`p-6 h-full ${feature.bgColor} ${feature.borderColor}`}
                  hover={true}
                >
                  <div className="text-center">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center`}
                      animate={{
                        boxShadow: [
                          `0 0 20px ${feature.color.replace('text-', '').replace('-', '')}`,
                          `0 0 30px ${feature.color.replace('text-', '').replace('-', '')}`,
                          `0 0 20px ${feature.color.replace('text-', '').replace('-', '')}`
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <feature.icon className={`text-3xl ${feature.color}`} />
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-white/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Team Section */}
        <motion.div
          className="px-4 py-20 mx-auto max-w-7xl"
          variants={itemVariants}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our world-class team of security experts, engineers, and designers
              are dedicated to protecting your digital life with cutting-edge innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "CEO & Founder",
                image: "https://ui-avatars.com/api/?name=Alex+Chen&background=00ffff&color=000&size=128",
                specialty: "Cybersecurity Expert"
              },
              {
                name: "Sarah Rodriguez",
                role: "CTO",
                image: "https://ui-avatars.com/api/?name=Sarah+Rodriguez&background=8b5cf6&color=fff&size=128",
                specialty: "AI & Machine Learning"
              },
              {
                name: "Marcus Johnson",
                role: "Lead Security Engineer",
                image: "https://ui-avatars.com/api/?name=Marcus+Johnson&background=00ff88&color=000&size=128",
                specialty: "Encryption & Privacy"
              },
              {
                name: "Emily Zhang",
                role: "UX/UI Designer",
                image: "https://ui-avatars.com/api/?name=Emily+Zhang&background=ff00ff&color=000&size=128",
                specialty: "Human-Centered Design"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GlassCard className="p-6 text-center" variant="dark" hover={true}>
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <img
                      className="w-24 h-24 mx-auto rounded-full border-4 border-neon-cyan/50 shadow-lg"
                      src={member.image}
                      alt={member.name}
                    />
                    <motion.div
                      className="absolute -bottom-2 -right-2 w-6 h-6 bg-neon-green rounded-full border-2 border-white/20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>

                  <p className="text-neon-cyan font-medium mb-2">
                    {member.role}
                  </p>

                  <p className="text-white/70 text-sm">
                    {member.specialty}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="px-4 py-20 mx-auto max-w-7xl"
          variants={itemVariants}
        >
          <GlassCard className="p-12" variant="primary" glow>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10K+", label: "Protected Devices" },
                { number: "99.9%", label: "Uptime Guarantee" },
                { number: "24/7", label: "Expert Support" },
                { number: "256-bit", label: "Encryption Standard" },
              ].map((stat, index) => (
                <div key={index}>
                  <motion.div
                    className="text-4xl font-bold text-neon-cyan mb-2"
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
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AboutPage;
