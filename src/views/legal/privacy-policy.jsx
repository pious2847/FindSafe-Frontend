import React from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
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
    <div className="min-h-screen relative">
      <AnimatedBackground variant="dashboard" />
      <AppBar />
      
      <div className="relative z-10 pt-24 pb-16">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="p-3 rounded-xl bg-neon-green/20 border border-neon-green/30"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 0, 0.3)",
                    "0 0 30px rgba(0, 255, 0, 0.5)",
                    "0 0 20px rgba(0, 255, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-8 h-8 text-neon-green" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
            </div>
            <p className="text-xl text-white/70">
              Your privacy is our priority. Learn how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-white/50 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-8" variant="primary">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-neon-cyan" />
                    Introduction
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    FindSafe ("we," "our," or "us") is committed to protecting your privacy and ensuring the security 
                    of your personal information. This Privacy Policy explains how we collect, use, disclose, and 
                    safeguard your information when you use our device security and tracking services, including our 
                    mobile application and web dashboard.
                  </p>
                </section>

                {/* Information We Collect */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Database className="w-6 h-6 text-neon-purple" />
                    Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                      <ul className="text-white/70 space-y-1">
                        <li>• Name and email address</li>
                        <li>• Phone number</li>
                        <li>• Account credentials</li>
                        <li>• Profile information</li>
                        <li>• Emergency contact details</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Device Information</h3>
                      <ul className="text-white/70 space-y-1">
                        <li>• Device identifiers (IMEI, device ID)</li>
                        <li>• Device model and operating system</li>
                        <li>• App version and settings</li>
                        <li>• Device status and mode</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Location Data</h3>
                      <ul className="text-white/70 space-y-1">
                        <li>• GPS coordinates and timestamps</li>
                        <li>• Location history</li>
                        <li>• Geofence interactions</li>
                        <li>• Movement patterns (when enabled)</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* How We Use Information */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-neon-orange" />
                    How We Use Your Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-neon-cyan rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/70">
                        <strong className="text-white">Device Security:</strong> To provide real-time location tracking, 
                        remote device control, and security features.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/70">
                        <strong className="text-white">Service Improvement:</strong> To enhance our services, 
                        develop new features, and improve user experience.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/70">
                        <strong className="text-white">Communication:</strong> To send important notifications, 
                        security alerts, and service updates.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-neon-orange rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/70">
                        <strong className="text-white">Legal Compliance:</strong> To comply with applicable laws, 
                        regulations, and legal processes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Data Security */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-neon-pink" />
                    Data Security
                  </h2>
                  <div className="p-6 bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 border border-neon-pink/30 rounded-lg">
                    <p className="text-white/70 leading-relaxed mb-4">
                      We implement industry-standard security measures to protect your personal information:
                    </p>
                    <ul className="text-white/70 space-y-2">
                      <li>• <strong className="text-white">Encryption:</strong> All data is encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                      <li>• <strong className="text-white">Access Controls:</strong> Strict access controls and authentication requirements</li>
                      <li>• <strong className="text-white">Regular Audits:</strong> Regular security audits and vulnerability assessments</li>
                      <li>• <strong className="text-white">Data Minimization:</strong> We collect only the data necessary for our services</li>
                    </ul>
                  </div>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-neon-cyan" />
                    Your Privacy Rights
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Access & Control</h3>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• View your personal data</li>
                        <li>• Update or correct information</li>
                        <li>• Download your data</li>
                        <li>• Delete your account</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Privacy Controls</h3>
                      <ul className="text-white/70 text-sm space-y-1">
                        <li>• Disable location sharing</li>
                        <li>• Manage notification preferences</li>
                        <li>• Control data retention</li>
                        <li>• Opt-out of analytics</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white/70 mb-4">
                      If you have questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-white/70">
                      <p><strong className="text-white">Email:</strong> staytech24@gmail.com</p>
                      <p><strong className="text-white">Address:</strong> FindSafe Privacy Team, staytech24@gmail.com</p>
                      <p><strong className="text-white">Phone:</strong> +233 59 988 0977 / +233 20 102 5963 </p>
                    </div>
                  </div>
                </section>

                {/* Updates */}
                <section className="border-t border-white/10 pt-6">
                  <p className="text-white/60 text-sm">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
