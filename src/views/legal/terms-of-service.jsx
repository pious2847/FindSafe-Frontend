import React from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import { FileText, Scale, AlertTriangle, Shield, Users, Gavel } from 'lucide-react';

const TermsOfService = () => {
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
                className="p-3 rounded-xl bg-neon-purple/20 border border-neon-purple/30"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(128, 0, 255, 0.3)",
                    "0 0 30px rgba(128, 0, 255, 0.5)",
                    "0 0 20px rgba(128, 0, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FileText className="w-8 h-8 text-neon-purple" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
            </div>
            <p className="text-xl text-white/70">
              Please read these terms carefully before using FindSafe services.
            </p>
            <p className="text-sm text-white/50 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-8" variant="primary">
              <div className="space-y-8">
                {/* Acceptance of Terms */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Scale className="w-6 h-6 text-neon-cyan" />
                    Acceptance of Terms
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    By accessing and using FindSafe's device security and tracking services ("Service"), you accept and agree 
                    to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                </section>

                {/* Service Description */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-neon-green" />
                    Service Description
                  </h2>
                  <div className="space-y-4">
                    <p className="text-white/70 leading-relaxed">
                      FindSafe provides device security and tracking services including but not limited to:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Core Services</h3>
                        <ul className="text-white/70 space-y-1">
                          <li>• Real-time device location tracking</li>
                          <li>• Remote device control and security</li>
                          <li>• Geofencing and location alerts</li>
                          <li>• Device status monitoring</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Additional Features</h3>
                        <ul className="text-white/70 space-y-1">
                          <li>• Emergency contact notifications</li>
                          <li>• Location history and analytics</li>
                          <li>• Multi-device management</li>
                          <li>• Security breach alerts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* User Responsibilities */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-neon-orange" />
                    User Responsibilities
                  </h2>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-neon-orange/10 to-neon-pink/10 border border-neon-orange/30 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-3">Account Security</h3>
                      <ul className="text-white/70 space-y-2">
                        <li>• Maintain the confidentiality of your account credentials</li>
                        <li>• Use strong, unique passwords for your account</li>
                        <li>• Notify us immediately of any unauthorized access</li>
                        <li>• Keep your contact information up to date</li>
                      </ul>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/30 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-3">Lawful Use</h3>
                      <ul className="text-white/70 space-y-2">
                        <li>• Use the service only for lawful purposes</li>
                        <li>• Respect the privacy and rights of others</li>
                        <li>• Do not use the service to stalk or harass individuals</li>
                        <li>• Comply with all applicable local, state, and federal laws</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Prohibited Uses */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-neon-pink" />
                    Prohibited Uses
                  </h2>
                  <div className="p-6 bg-gradient-to-r from-red-500/10 to-neon-pink/10 border border-red-500/30 rounded-lg">
                    <p className="text-white/70 mb-4">You may not use our service:</p>
                    <ul className="text-white/70 space-y-2">
                      <li>• To track individuals without their knowledge or consent</li>
                      <li>• For any illegal or unauthorized purpose</li>
                      <li>• To violate any international, federal, provincial, or state regulations or laws</li>
                      <li>• To transmit worms, viruses, or any code of a destructive nature</li>
                      <li>• To gather or collect email addresses or other contact information illegally</li>
                      <li>• To interfere with, disrupt, or create an undue burden on our servers or networks</li>
                    </ul>
                  </div>
                </section>

                {/* Service Availability */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Gavel className="w-6 h-6 text-neon-cyan" />
                    Service Availability & Limitations
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Service Availability</h3>
                      <p className="text-white/70 text-sm">
                        We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. 
                        Maintenance, updates, and unforeseen circumstances may cause temporary service interruptions.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Location Accuracy</h3>
                      <p className="text-white/70 text-sm">
                        Location accuracy depends on various factors including GPS signal strength, network connectivity, 
                        and device capabilities. We cannot guarantee 100% accuracy in all conditions.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Privacy & Data */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Privacy & Data Protection</h2>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white/70 leading-relaxed">
                      Your privacy is important to us. Our collection and use of personal information is governed by our 
                      Privacy Policy, which is incorporated into these Terms of Service by reference. By using our service, 
                      you consent to the collection and use of your information as outlined in our Privacy Policy.
                    </p>
                  </div>
                </section>

                {/* Limitation of Liability */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
                  <div className="p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-white/70 leading-relaxed">
                      FindSafe shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                      including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                      resulting from your use of the service.
                    </p>
                  </div>
                </section>

                {/* Termination */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                  <div className="space-y-3">
                    <p className="text-white/70">
                      We may terminate or suspend your account and bar access to the service immediately, without prior notice 
                      or liability, under our sole discretion, for any reason whatsoever including but not limited to a breach 
                      of the Terms.
                    </p>
                    <p className="text-white/70">
                      You may terminate your account at any time by contacting our support team or through your account settings.
                    </p>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white/70 mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2 text-white/70">
                      <p><strong className="text-white">Email:</strong> legal@findsafe.com</p>
                      <p><strong className="text-white">Address:</strong> FindSafe Legal Team, staytech24@gmail.com</p>
                      <p><strong className="text-white">Phone:</strong> +233 59 988 0977 / +233 20 102 5963</p>
                    </div>
                  </div>
                </section>

                {/* Changes to Terms */}
                <section className="border-t border-white/10 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Changes to Terms</h2>
                  <p className="text-white/60 text-sm">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                    we will provide at least 30 days notice prior to any new terms taking effect.
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

export default TermsOfService;
