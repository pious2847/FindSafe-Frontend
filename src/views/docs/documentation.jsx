import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import {
  Book,
  Download,
  Smartphone,
  Shield,
  MapPin,
  Bell,
  Trash2,
  Volume2,
  Users,
  Settings,
  Lock,
  Eye,
  ChevronRight,
  ExternalLink,
  Code,
  Zap,
  Globe
} from 'lucide-react';

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: Download },
    { id: 'features', title: 'Features', icon: Zap },
    { id: 'installation', title: 'Installation', icon: Smartphone },
    { id: 'api', title: 'API Reference', icon: Code },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'support', title: 'Support', icon: Users },
  ];

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
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="p-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/30"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(0, 255, 255, 0.3)",
                    "0 0 30px rgba(0, 255, 255, 0.5)",
                    "0 0 20px rgba(0, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Book className="w-8 h-8 text-neon-cyan" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white">FindSafe Documentation</h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprehensive guide to FindSafe's powerful device security and tracking features.
              Learn how to protect your devices and loved ones with our advanced security platform.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <motion.div variants={itemVariants} className="lg:w-1/4">
              <GlassCard className="p-6 sticky top-24" variant="dark">
                <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                  ))}
                </nav>
              </GlassCard>
            </motion.div>

            {/* Main Content */}
            <motion.div variants={itemVariants} className="lg:w-3/4">
              <GlassCard className="p-8" variant="primary">
                {activeSection === 'getting-started' && <GettingStartedSection />}
                {activeSection === 'features' && <FeaturesSection />}
                {activeSection === 'installation' && <InstallationSection />}
                {activeSection === 'api' && <APISection />}
                {activeSection === 'security' && <SecuritySection />}
                {activeSection === 'support' && <SupportSection />}
              </GlassCard>
            </motion.div>
          </div>

        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

// Section Components
const GettingStartedSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <Download className="w-6 h-6 text-neon-cyan" />
      <h2 className="text-2xl font-bold text-white">Getting Started</h2>
    </div>

    <div className="grid gap-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-neon-cyan/20 rounded-full flex items-center justify-center text-neon-cyan font-bold">1</div>
          <h3 className="text-lg font-semibold text-white">Create Account</h3>
        </div>
        <p className="text-white/70">
          Sign up for a FindSafe account on our web dashboard. Verify your email address through the OTP verification process.
        </p>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center text-neon-purple font-bold">2</div>
          <h3 className="text-lg font-semibold text-white">Download Mobile App</h3>
        </div>
        <p className="text-white/70">
          Download the FindSafe mobile app from the App Store (iOS) or Google Play Store (Android) to enable device tracking and security features.
        </p>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center text-neon-green font-bold">3</div>
          <h3 className="text-lg font-semibold text-white">Connect Devices</h3>
        </div>
        <p className="text-white/70">
          Log into the mobile app with your account credentials. Your device will automatically be registered and appear in your dashboard.
        </p>
      </div>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <Zap className="w-6 h-6 text-neon-cyan" />
      <h2 className="text-2xl font-bold text-white">Core Features</h2>
    </div>

    <div className="grid gap-6">
      <div className="p-6 bg-gradient-to-r from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/30 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="w-6 h-6 text-neon-cyan" />
          <h3 className="text-lg font-semibold text-white">Real-time Location Tracking</h3>
        </div>
        <p className="text-white/70 mb-3">
          Monitor device locations in real-time with precise GPS tracking. View location history and set up geofences for enhanced security.
        </p>
        <ul className="text-sm text-white/60 space-y-1">
          <li>• Live location updates</li>
          <li>• Location history tracking</li>
          <li>• Geofence alerts</li>
          <li>• Route tracking</li>
        </ul>
      </div>

      <div className="p-6 bg-gradient-to-r from-neon-orange/10 to-neon-pink/10 border border-neon-orange/30 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-6 h-6 text-neon-orange" />
          <h3 className="text-lg font-semibold text-white">Remote Device Control</h3>
        </div>
        <p className="text-white/70 mb-3">
          Secure your devices remotely with comprehensive control features. Protect your data in case of theft or loss.
        </p>
        <ul className="text-sm text-white/60 space-y-1">
          <li>• Remote device lock/disable</li>
          <li>• Data wipe capabilities</li>
          <li>• Alarm activation</li>
          <li>• Mode switching (Safe/Lost/Stolen)</li>
        </ul>
      </div>

      <div className="p-6 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 border border-neon-green/30 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Bell className="w-6 h-6 text-neon-green" />
          <h3 className="text-lg font-semibold text-white">Smart Notifications</h3>
        </div>
        <p className="text-white/70 mb-3">
          Stay informed with intelligent notifications about device status, location changes, and security events.
        </p>
        <ul className="text-sm text-white/60 space-y-1">
          <li>• Geofence entry/exit alerts</li>
          <li>• Device status changes</li>
          <li>• Security breach notifications</li>
          <li>• Low battery warnings</li>
        </ul>
      </div>
    </div>
  </div>
);

const InstallationSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <Smartphone className="w-6 h-6 text-neon-cyan" />
      <h2 className="text-2xl font-bold text-white">Installation Guide</h2>
    </div>

    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Mobile App Installation</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-white mb-2">Android (Google Play Store)</h4>
            <p className="text-white/70 text-sm mb-2">Search for "FindSafe" or use the direct link:</p>
            <code className="bg-black/30 px-3 py-1 rounded text-neon-cyan text-sm">
              https://play.google.com/store/apps/details?id=com.findsafe.app
            </code>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">iOS (App Store)</h4>
            <p className="text-white/70 text-sm mb-2">Search for "FindSafe" or use the direct link:</p>
            <code className="bg-black/30 px-3 py-1 rounded text-neon-cyan text-sm">
              https://apps.apple.com/app/findsafe/id123456789
            </code>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">System Requirements</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-white mb-2">Android</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• Android 6.0 (API level 23) or higher</li>
              <li>• 50MB free storage space</li>
              <li>• GPS/Location services</li>
              <li>• Internet connection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">iOS</h4>
            <ul className="text-white/70 text-sm space-y-1">
              <li>• iOS 12.0 or later</li>
              <li>• 50MB free storage space</li>
              <li>• Location services</li>
              <li>• Internet connection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const APISection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <Code className="w-6 h-6 text-neon-cyan" />
      <h2 className="text-2xl font-bold text-white">API Reference</h2>
    </div>

    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Base URL</h3>
        <code className="bg-black/30 px-3 py-2 rounded text-neon-cyan block">
          https://api.findsafe.com/v1
        </code>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Authentication</h3>
        <p className="text-white/70 mb-3">All API requests require authentication using Bearer tokens:</p>
        <code className="bg-black/30 px-3 py-2 rounded text-neon-cyan block text-sm">
          Authorization: Bearer YOUR_API_TOKEN
        </code>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Key Endpoints</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono">GET</span>
            <code className="text-neon-cyan">/devices</code>
            <span className="text-white/70 text-sm">Get all user devices</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono">POST</span>
            <code className="text-neon-cyan">/devices/{'id'}/location</code>
            <span className="text-white/70 text-sm">Update device location</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-mono">PUT</span>
            <code className="text-neon-cyan">/devices/{'id'}/mode</code>
            <span className="text-white/70 text-sm">Change device mode</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono">GET</span>
            <code className="text-neon-cyan">/geofences</code>
            <span className="text-white/70 text-sm">Get user geofences</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SecuritySection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <Shield className="w-6 h-6 text-neon-cyan" />
      <h2 className="text-2xl font-bold text-white">Security & Privacy</h2>
    </div>

    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 border border-neon-green/30 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Lock className="w-5 h-5 text-neon-green" />
          <h3 className="text-lg font-semibold text-white">Data Encryption</h3>
        </div>
        <p className="text-white/70">
          All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.
          Your location data and personal information are protected with industry-standard security measures.
        </p>
      </div>

      <div className="p-6 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-neon-purple/30 rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Eye className="w-5 h-5 text-neon-purple" />
          <h3 className="text-lg font-semibold text-white">Privacy Controls</h3>
        </div>
        <p className="text-white/70">
          You have full control over your data. Location sharing can be disabled at any time,
          and you can delete your account and all associated data whenever you choose.
        </p>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Security Best Practices</h3>
        <ul className="text-white/70 space-y-2">
          <li>• Use strong, unique passwords for your account</li>
          <li>• Enable two-factor authentication when available</li>
          <li>• Keep your mobile app updated to the latest version</li>
          <li>• Review and manage connected devices regularly</li>
          <li>• Report any suspicious activity immediately</li>
        </ul>
      </div>
    </div>
  </div>
);

const SupportSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 mb-6">
      <Users className="w-6 h-6 text-neon-cyan" />
      <h2 className="text-2xl font-bold text-white">Support & Help</h2>
    </div>

    <div className="space-y-6">
      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Contact Support</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-neon-cyan" />
            <span className="text-white/70">Email: support@findsafe.com</span>
          </div>
          <div className="flex items-center gap-3">
            <ExternalLink className="w-5 h-5 text-neon-green" />
            <span className="text-white/70">Live Chat: Available 24/7 on our website</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-white mb-1">How accurate is the location tracking?</h4>
            <p className="text-white/70 text-sm">
              FindSafe uses GPS technology with accuracy typically within 3-5 meters in optimal conditions.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">Can I track multiple devices?</h4>
            <p className="text-white/70 text-sm">
              Yes, you can add and monitor multiple devices from a single account.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-1">What happens if my device is offline?</h4>
            <p className="text-white/70 text-sm">
              The last known location will be displayed, and you'll be notified when the device comes back online.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DocumentationPage;
