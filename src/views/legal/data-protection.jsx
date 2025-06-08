import React from 'react';
import { motion } from 'framer-motion';
import AppBar from "@/components/Navigations/AppBar";
import Footer from "@/components/footer/footer";
import GlassCard from "@/components/glass/GlassCard";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import { 
  Shield, 
  Eye, 
  Download, 
  Trash2, 
  Edit, 
  Lock, 
  Globe, 
  CheckCircle,
  AlertCircle,
  Mail
} from 'lucide-react';

const DataProtection = () => {
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
                className="p-3 rounded-xl bg-neon-blue/20 border border-neon-blue/30"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 20px rgba(0, 100, 255, 0.3)",
                    "0 0 30px rgba(0, 100, 255, 0.5)",
                    "0 0 20px rgba(0, 100, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Globe className="w-8 h-8 text-neon-blue" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white">Data Protection Rights</h1>
            </div>
            <p className="text-xl text-white/70">
              Your data protection rights under international privacy regulations.
            </p>
            <p className="text-sm text-white/50 mt-2">
              Effective since: May 25, 2018 | Last updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlassCard className="p-8" variant="primary">
              <div className="space-y-8">
                {/* Overview */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-neon-cyan" />
                    Data Protection Overview
                  </h2>
                  <div className="p-6 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border border-neon-cyan/30 rounded-lg">
                    <p className="text-white/70 leading-relaxed mb-4">
                      International data protection regulations strengthen and unify data protection for individuals 
                      and address the export of personal data. These laws came into effect on May 25, 2018, and apply 
                      to organizations worldwide that process personal data of EU residents.
                    </p>
                    <p className="text-white/70 leading-relaxed">
                      FindSafe is committed to full compliance with international data protection standards and protecting 
                      the privacy rights of all our users, regardless of their location.
                    </p>
                  </div>
                </section>

                {/* Your Rights */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-neon-green" />
                    Your Data Protection Rights
                  </h2>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 border border-neon-green/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Eye className="w-5 h-5 text-neon-green" />
                        <h3 className="text-lg font-semibold text-white">Right to Access</h3>
                      </div>
                      <p className="text-white/70 mb-3">
                        You have the right to request access to your personal data and receive information about how we process it.
                      </p>
                      <button className="px-4 py-2 bg-neon-green/20 border border-neon-green/30 text-neon-green rounded-lg hover:bg-neon-green/30 transition-colors text-sm">
                        Request Data Access
                      </button>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-neon-purple/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Edit className="w-5 h-5 text-neon-purple" />
                        <h3 className="text-lg font-semibold text-white">Right to Rectification</h3>
                      </div>
                      <p className="text-white/70 mb-3">
                        You can request correction of inaccurate or incomplete personal data.
                      </p>
                      <button className="px-4 py-2 bg-neon-purple/20 border border-neon-purple/30 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-colors text-sm">
                        Update My Data
                      </button>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-neon-orange/10 to-neon-yellow/10 border border-neon-orange/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Trash2 className="w-5 h-5 text-neon-orange" />
                        <h3 className="text-lg font-semibold text-white">Right to Erasure ("Right to be Forgotten")</h3>
                      </div>
                      <p className="text-white/70 mb-3">
                        You can request deletion of your personal data under certain circumstances.
                      </p>
                      <button className="px-4 py-2 bg-neon-orange/20 border border-neon-orange/30 text-neon-orange rounded-lg hover:bg-neon-orange/30 transition-colors text-sm">
                        Request Data Deletion
                      </button>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border border-neon-cyan/30 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Download className="w-5 h-5 text-neon-cyan" />
                        <h3 className="text-lg font-semibold text-white">Right to Data Portability</h3>
                      </div>
                      <p className="text-white/70 mb-3">
                        You can request a copy of your data in a structured, machine-readable format.
                      </p>
                      <button className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/30 text-neon-cyan rounded-lg hover:bg-neon-cyan/30 transition-colors text-sm">
                        Export My Data
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-neon-pink" />
                          Right to Object
                        </h3>
                        <p className="text-white/70 text-sm">
                          You can object to processing of your personal data for direct marketing or other purposes.
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-neon-green" />
                          Right to Restrict Processing
                        </h3>
                        <p className="text-white/70 text-sm">
                          You can request limitation of processing under certain circumstances.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Legal Basis for Processing */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Legal Basis for Processing</h2>
                  <div className="space-y-4">
                    <p className="text-white/70">
                      We process your personal data based on the following legal grounds:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Consent</h3>
                        <p className="text-white/70 text-sm">
                          For marketing communications and optional features where you have given explicit consent.
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Contract Performance</h3>
                        <p className="text-white/70 text-sm">
                          To provide our device security and tracking services as outlined in our Terms of Service.
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Legitimate Interest</h3>
                        <p className="text-white/70 text-sm">
                          For service improvement, security, and fraud prevention purposes.
                        </p>
                      </div>
                      <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-2">Legal Obligation</h3>
                        <p className="text-white/70 text-sm">
                          To comply with applicable laws and regulations.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Protection Measures */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Lock className="w-6 h-6 text-neon-pink" />
                    Data Protection Measures
                  </h2>
                  <div className="p-6 bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 border border-neon-pink/30 rounded-lg">
                    <p className="text-white/70 leading-relaxed mb-4">
                      We implement appropriate technical and organizational measures to ensure data security:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Technical Measures</h4>
                        <ul className="text-white/70 text-sm space-y-1">
                          <li>• End-to-end encryption</li>
                          <li>• Secure data transmission (TLS 1.3)</li>
                          <li>• Regular security audits</li>
                          <li>• Access controls and authentication</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">Organizational Measures</h4>
                        <ul className="text-white/70 text-sm space-y-1">
                          <li>• Staff training on data protection</li>
                          <li>• Data processing agreements</li>
                          <li>• Privacy impact assessments</li>
                          <li>• Incident response procedures</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Data Transfers */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
                  <div className="space-y-4">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-3">EU Data Protection</h3>
                      <p className="text-white/70 mb-3">
                        When we transfer personal data outside the EU, we ensure adequate protection through:
                      </p>
                      <ul className="text-white/70 space-y-2">
                        <li>• <strong className="text-white">Adequacy Decisions:</strong> Transfers to countries with adequate protection</li>
                        <li>• <strong className="text-white">Standard Contractual Clauses:</strong> EU-approved contract terms</li>
                        <li>• <strong className="text-white">Binding Corporate Rules:</strong> Internal data protection rules</li>
                        <li>• <strong className="text-white">Certification Schemes:</strong> Approved certification mechanisms</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Data Retention */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Account Data</h3>
                      <p className="text-white/70 text-sm">
                        Retained while your account is active and for 30 days after account deletion for recovery purposes.
                      </p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Location Data</h3>
                      <p className="text-white/70 text-sm">
                        Retained for 12 months for security and service improvement purposes, unless deleted earlier upon request.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Contact DPO */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-neon-cyan" />
                    Contact Our Data Protection Officer
                  </h2>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-white/70 mb-4">
                      For any questions about your data protection rights or to exercise your rights, contact our Data Protection Officer:
                    </p>
                    <div className="space-y-2 text-white/70">
                      <p><strong className="text-white">Email:</strong> dpo@findsafe.com</p>
                      <p><strong className="text-white">Address:</strong> FindSafe Data Protection Officer, staytech24@gmail.com</p>
                      <p><strong className="text-white">Response Time:</strong> We will respond to your request within 30 days</p>
                    </div>
                    <div className="mt-4 p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg">
                      <p className="text-white/70 text-sm">
                        <strong className="text-white">Supervisory Authority:</strong> You also have the right to lodge a complaint 
                        with your local data protection authority if you believe your rights have been violated.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Updates */}
                <section className="border-t border-white/10 pt-6">
                  <h2 className="text-xl font-bold text-white mb-3">Updates to This Policy</h2>
                  <p className="text-white/60 text-sm">
                    We may update this data protection information from time to time to reflect changes in our practices 
                    or legal requirements. We will notify you of any material changes through our usual communication channels.
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

export default DataProtection;
