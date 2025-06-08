
import React from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import HeroSection from "@/components/Hero/HeroSection";
import HomeBody from "@/components/Home/HomeBody";
import PricingCard from "@/components/pricing/pricingcard";
import Footer from "@/components/footer/footer";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";

function MainPanel() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            <AnimatedBackground variant="default" />

            <motion.div
                className="relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={sectionVariants}>
                    <AppBar />
                </motion.div>

                <motion.div variants={sectionVariants}>
                    <HeroSection />
                </motion.div>

                <motion.div
                    variants={sectionVariants}
                    className="py-20"
                >
                    <HomeBody />
                </motion.div>

                <motion.div
                    variants={sectionVariants}
                    className="py-20"
                >
                    <PricingCard />
                </motion.div>

                <motion.div variants={sectionVariants}>
                    <Footer />
                </motion.div>
            </motion.div>
        </div>
     );
}

export default MainPanel;