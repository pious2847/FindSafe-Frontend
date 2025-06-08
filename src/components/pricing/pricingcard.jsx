/* eslint-disable react/prop-types */
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Star, Shield, Server } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";


const PricingCard = ({ plan, isPopular, features, price, planIcon, variant, description }) => {
  const IconComponent = planIcon;

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05, y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <GlassCard
        className={`p-8 h-full ${isPopular ? 'border-neon-cyan/50 bg-cyan-500/10' : ''}`}
        variant={variant}
        glow={isPopular}
      >
        {isPopular && (
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-neon-cyan to-neon-purple px-6 py-2 rounded-full text-black font-bold text-sm"
            animate={{
              boxShadow: [
                "0 0 20px rgba(0, 255, 255, 0.5)",
                "0 0 30px rgba(0, 255, 255, 0.8)",
                "0 0 20px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ Most Popular
          </motion.div>
        )}

        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <IconComponent className="text-3xl text-neon-cyan" />
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
          <p className="text-white/70 text-sm mb-4">{description}</p>

          <div className="flex items-baseline justify-center">
            <motion.span
              className="text-5xl font-bold text-neon-cyan"
              animate={{
                textShadow: [
                  "0 0 10px #00ffff",
                  "0 0 20px #00ffff",
                  "0 0 10px #00ffff"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ${price}
            </motion.span>
            <span className="text-white/70 ml-2">/month</span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center text-white/90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {feature.included ? (
                <CheckCircle className="text-neon-green mr-3" size={18} />
              ) : (
                <XCircle className="text-red-400 mr-3" size={18} />
              )}
              <span className={feature.included ? 'text-white' : 'text-white/50'}>
                {feature.label}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto">
          <Link to={features.find((f) => f.subscribeButtonurl)?.subscribeButtonurl || "#"}>
            <GlassButton
              variant={isPopular ? "primary" : "ghost"}
              className="w-full py-4 text-lg font-semibold"
              glow={isPopular}
            >
              {price === 0 ? 'Get Started Free' : 'Start 14-Day Trial'}
            </GlassButton>
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default function ThreeTierPricing() {
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
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const pricingPlans = [
    {
      plan: "Starter",
      price: 0,
      planIcon: Shield,
      variant: "dark",
      description: "Perfect for personal device protection",
      features: [
        { label: "Up to 3 devices", included: true },
        { label: "Basic location tracking", included: true },
        { label: "Remote device lock", included: true },
        { label: "Email support", included: true },
        { label: "Advanced security features", included: false },
        { label: "Priority support", included: false },
        { subscribeButtonurl: "/free/subscribe", included: true },
      ],
    },
    {
      plan: "Professional",
      price: 15,
      isPopular: true,
      planIcon: Star,
      variant: "primary",
      description: "Ideal for families and small teams",
      features: [
        { label: "Up to 10 devices", included: true },
        { label: "Real-time GPS tracking", included: true },
        { label: "Remote wipe & lock", included: true },
        { label: "Geofencing alerts", included: true },
        { label: "Advanced encryption", included: true },
        { label: "24/7 priority support", included: true },
        { subscribeButtonurl: "/professional/subscribe", included: true },
      ],
    },
    {
      plan: "Enterprise",
      price: 45,
      planIcon: Server,
      variant: "secondary",
      description: "Complete security for organizations",
      features: [
        { label: "Unlimited devices", included: true },
        { label: "Advanced threat detection", included: true },
        { label: "Custom security policies", included: true },
        { label: "API access & integrations", included: true },
        { label: "Dedicated account manager", included: true },
        { label: "SLA guarantee", included: true },
        { subscribeButtonurl: "/enterprise/subscribe", included: true },
      ],
    },
  ];

  return (
    <motion.div
      className="py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          variants={itemVariants}
        >
          <GlassCard className="p-8" variant="dark">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Security Level
            </h2>
            <p className="text-lg text-white/70">
              Start with a 14-day free trial. No credit card required. Cancel anytime.
            </p>

            <div className="flex justify-center items-center gap-4 mt-6">
              <span className="text-white/70">Monthly</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-12 h-6 bg-white/20 rounded-full border border-white/30"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-neon-cyan rounded-full transition-transform"></div>
              </div>
              <span className="text-white/70">
                Annual <span className="text-neon-green text-sm">(Save 20%)</span>
              </span>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <PricingCard
                plan={plan.plan}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
                planIcon={plan.planIcon}
                variant={plan.variant}
                description={plan.description}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <GlassCard className="p-8" variant="primary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "99.9%", label: "Uptime SLA" },
                { number: "256-bit", label: "Encryption" },
                { number: "24/7", label: "Support" },
                { number: "SOC 2", label: "Compliant" },
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
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  );
}