
import React from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import PricingCard from "@/components/pricing/pricingcard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import GlassCard from "@/components/glass/GlassCard";
import { CiDollar, CiStar } from "react-icons/ci";
import { Shield } from 'lucide-react';

const PricingPage = () => {
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
                    className="px-4 py-20 mx-auto max-w-7xl text-center"
                    variants={itemVariants}
                >
                    <GlassCard className="p-12" variant="primary" glow>
                        <motion.div
                            className="mb-8"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-20 h-20 mx-auto bg-neon-purple/20 rounded-full border border-neon-purple/30 flex items-center justify-center">
                                <CiDollar className="text-4xl text-neon-purple" />
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-6xl font-bold mb-6"
                            animate={{
                                textShadow: [
                                    "0 0 20px #8b5cf6",
                                    "0 0 40px #8b5cf6",
                                    "0 0 20px #8b5cf6"
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-white">Choose Your</span>{" "}
                            <span className="text-neon-purple">Security Plan</span>
                        </motion.h1>

                        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Protect your digital life with our advanced security solutions.
                            From basic protection to enterprise-grade security, we have the perfect plan for you.
                        </p>
                    </GlassCard>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    className="px-4 py-20 mx-auto max-w-7xl"
                    variants={itemVariants}
                >
                    <PricingCard />
                </motion.div>

                {/* Features Comparison */}
                <motion.div
                    className="px-4 py-20 mx-auto max-w-7xl"
                    variants={itemVariants}
                >
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Why Choose FindSafe?
                        </h2>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto">
                            Industry-leading security features that set us apart from the competition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Military-Grade Security",
                                description: "256-bit AES encryption and zero-knowledge architecture ensure your data remains completely private.",
                                color: "text-neon-cyan",
                                bgColor: "bg-cyan-500/20",
                                borderColor: "border-cyan-500/30"
                            },
                            {
                                icon: CiStar,
                                title: "24/7 Expert Support",
                                description: "Round-the-clock assistance from our certified security experts whenever you need help.",
                                color: "text-neon-purple",
                                bgColor: "bg-purple-500/20",
                                borderColor: "border-purple-500/30"
                            },
                            {
                                icon: CiDollar,
                                title: "Transparent Pricing",
                                description: "No hidden fees, no surprise charges. What you see is what you pay, with full value for your investment.",
                                color: "text-neon-green",
                                bgColor: "bg-green-500/20",
                                borderColor: "border-green-500/30"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                custom={index}
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <GlassCard
                                    className={`p-8 h-full ${feature.bgColor} ${feature.borderColor}`}
                                    hover={true}
                                >
                                    <div className="text-center">
                                        <motion.div
                                            className={`w-16 h-16 mx-auto mb-6 rounded-xl ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center`}
                                            animate={{
                                                boxShadow: [
                                                    `0 0 20px ${feature.color.replace('text-neon-', '#')}`,
                                                    `0 0 30px ${feature.color.replace('text-neon-', '#')}`,
                                                    `0 0 20px ${feature.color.replace('text-neon-', '#')}`
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                        >
                                            <feature.icon className={`text-3xl ${feature.color}`} />
                                        </motion.div>

                                        <h3 className="text-2xl font-bold text-white mb-4">
                                            {feature.title}
                                        </h3>

                                        <p className="text-white/70 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default PricingPage;