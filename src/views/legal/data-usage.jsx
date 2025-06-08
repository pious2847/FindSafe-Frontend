import React from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import { Cookie, Settings, BarChart3, Shield, Eye, Trash2 } from 'lucide-react';

const DataUsage = () => {
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
                className="p-3 rounded-xl bg-neon-orange/20 border border-neon-orange/30"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(255, 165, 0, 0.3)",
                    "0 0 30px rgba(255, 165, 0, 0.5)",
                    "0 0 20px rgba(255, 165, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cookie className="w-8 h-8 text-neon-orange" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white">Data Usage Policy</h1>
            </div>
            <p className="text-xl text-white/70">
              Learn how we use tracking technologies to enhance your experience.
            </p>
            <p className="text-sm text-white/50 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-8" variant="primary">
              <div className="space-y-8">
                {/* What Are Tracking Technologies */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Cookie className="w-6 h-6 text-neon-cyan" />
                    What Are Tracking Technologies?
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-4">
                    We use various tracking technologies including small text files stored on your device when you visit our website or use our services. 
                    These help us provide you with a better experience by remembering your preferences and improving our services.
                  </p>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Similar Technologies</h3>
                    <p className="text-white/70 text-sm">
                      We also use similar technologies such as web beacons, pixels, and local storage to collect information 
                      about how you use our services and to provide personalized experiences.
                    </p>
                  </div>
                </section>

                {/* Types of Data Collection */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-neon-purple" />
                    Types of Data We Collect
                  </h2>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 border border-neon-green/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="w-5 h-5 text-neon-green" />
                        <h3 className="text-lg font-semibold text-white">Essential Data</h3>
                        <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded-full">Required</span>
                      </div>
                      <p className="text-white/70 mb-3">
                        This data is necessary for the website to function and cannot be disabled in our systems.
                      </p>
                      <ul className="text-white/60 text-sm space-y-1">
                        <li>• Authentication and security</li>
                        <li>• Session management</li>
                        <li>• Load balancing</li>
                        <li>• Basic functionality</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-neon-purple/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Settings className="w-5 h-5 text-neon-purple" />
                        <h3 className="text-lg font-semibold text-white">Functional Data</h3>
                        <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full">Optional</span>
                      </div>
                      <p className="text-white/70 mb-3">
                        This data enables enhanced functionality and personalization.
                      </p>
                      <ul className="text-white/60 text-sm space-y-1">
                        <li>• Language preferences</li>
                        <li>• Theme settings</li>
                        <li>• User interface customization</li>
                        <li>• Remember login status</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border border-neon-cyan/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <BarChart3 className="w-5 h-5 text-neon-cyan" />
                        <h3 className="text-lg font-semibold text-white">Analytics Data</h3>
                        <span className="px-2 py-1 bg-neon-cyan/20 text-neon-cyan text-xs rounded-full">Optional</span>
                      </div>
                      <p className="text-white/70 mb-3">
                        This data helps us understand how visitors interact with our website.
                      </p>
                      <ul className="text-white/60 text-sm space-y-1">
                        <li>• Page views and user behavior</li>
                        <li>• Performance monitoring</li>
                        <li>• Error tracking</li>
                        <li>• Usage statistics</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-neon-orange/10 to-neon-yellow/10 border border-neon-orange/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Eye className="w-5 h-5 text-neon-orange" />
                        <h3 className="text-lg font-semibold text-white">Marketing Data</h3>
                        <span className="px-2 py-1 bg-neon-orange/20 text-neon-orange text-xs rounded-full">Optional</span>
                      </div>
                      <p className="text-white/70 mb-3">
                        This data is used to deliver relevant advertisements and track campaign effectiveness.
                      </p>
                      <ul className="text-white/60 text-sm space-y-1">
                        <li>• Targeted advertising</li>
                        <li>• Social media integration</li>
                        <li>• Campaign tracking</li>
                        <li>• Conversion measurement</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Third-Party Services */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                  <div className="space-y-4">
                    <p className="text-white/70">
                      We use third-party services that may collect their own data. These include:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
                        <ul className="text-white/70 text-sm space-y-1">
                          <li>• Google Analytics</li>
                          <li>• Mixpanel</li>
                          <li>• Hotjar</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Support & Communication</h3>
                        <ul className="text-white/70 text-sm space-y-1">
                          <li>• Intercom</li>
                          <li>• Zendesk</li>
                          <li>• Email services</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Managing Data */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Trash2 className="w-6 h-6 text-neon-pink" />
                    Managing Your Data Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 border border-neon-pink/30 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-3">Browser Settings</h3>
                      <p className="text-white/70 mb-3">
                        You can control and manage data collection through your browser settings:
                      </p>
                      <ul className="text-white/70 space-y-2">
                        <li>• <strong className="text-white">Chrome:</strong> Settings → Privacy and security → Site data</li>
                        <li>• <strong className="text-white">Firefox:</strong> Options → Privacy & Security → Site Data</li>
                        <li>• <strong className="text-white">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                        <li>• <strong className="text-white">Edge:</strong> Settings → Site permissions</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-3">Our Data Preferences</h3>
                      <p className="text-white/70 mb-3">
                        You can also manage your data preferences directly through our website:
                      </p>
                      <button className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan rounded-lg hover:bg-neon-cyan/30 transition-colors">
                        Manage Data Preferences
                      </button>
                    </div>
                  </div>
                </section>

                {/* Data Retention */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Session Data</h3>
                      <p className="text-white/70 text-sm">
                        Temporary data that is deleted when you close your browser.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Persistent Data</h3>
                      <p className="text-white/70 text-sm">
                        Remains on your device for a set period (typically 1-24 months) or until manually deleted.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Questions About Data Usage?</h2>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white/70 mb-4">
                      If you have any questions about our data usage practices, please contact us:
                    </p>
                    <div className="space-y-2 text-white/70">
                      <p><strong className="text-white">Email:</strong> privacy@findsafe.com</p>
                      <p><strong className="text-white">Address:</strong> FindSafe Privacy Team, staytech24@gmail.com</p>
                    </div>
                  </div>
                </section>

                {/* Updates */}
                <section className="border-t border-white/10 pt-6">
                  <p className="text-white/60 text-sm">
                    We may update this Data Usage Policy from time to time to reflect changes in our practices or for other 
                    operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about 
                    our data collection practices.
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

export default DataUsage;
