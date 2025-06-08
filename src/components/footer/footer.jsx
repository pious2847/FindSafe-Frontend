
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';
import { Logo } from '../logo';
import GlassCard from '@/components/glass/GlassCard';

const Footer = () => {
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
    <footer className="relative py-20">
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <GlassCard className="p-12" variant="dark">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div className="md:col-span-1" variants={itemVariants}>
              <div className="flex items-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mr-3"
                >
                  <Logo height={32} width={32} />
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold text-neon-cyan"
                  animate={{
                    textShadow: [
                      "0 0 10px #00ffff",
                      "0 0 20px #00ffff",
                      "0 0 10px #00ffff"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  FindSafe
                </motion.h3>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Advanced device security and tracking platform powered by cutting-edge AI technology.
                Protecting what matters most to you.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="text-neon-cyan" size={16} />
                  <span className="text-sm">support@findsafe.com</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="text-neon-green" size={16} />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="text-neon-purple" size={16} />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </motion.div>
            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Shield className="text-neon-cyan" size={20} />
                Resources
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Documentation", href: "/docs/installation" },
                  { label: "API Reference", href: "#" },
                  { label: "Support Center", href: "#" },
                  { label: "Status Page", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-neon-cyan transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Careers", href: "#" },
                  { label: "Press Kit", href: "#" },
                  { label: "Partners", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-neon-purple transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Social */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6">Legal & Social</h3>
              <ul className="space-y-3 mb-6">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Cookie Policy", href: "#" },
                  { label: "GDPR Compliance", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-neon-green transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { name: "Twitter", icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" },
                  { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { name: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg border border-white/20 flex items-center justify-center text-white/70 hover:text-neon-cyan hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            className="mt-12 pt-8 border-t border-white/20"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">
                &copy; 2024 FindSafe. All rights reserved. Built with ❤️ for digital security.
              </p>

              <div className="flex items-center gap-6 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  All systems operational
                </span>
                <span>v2.1.0</span>
              </div>
            </div>
          </motion.div>
        </GlassCard>
      </motion.div>
    </footer>
  );
};

export default Footer;
