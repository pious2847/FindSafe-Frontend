import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Shield } from 'lucide-react';
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import Toast from "@/components/toastmsg";
import { Loader } from "@/components/loader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [errors, setErrors] = useState({});

  const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowToast(false);
    setErrors({});

    // Validation
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      const data = await response.json();

      if (data.success) {
        triggerToast('Password reset code sent to your email!', 'success');
        // Navigate to OTP verification for password reset
        setTimeout(() => {
          navigate('/verify-reset-otp', { 
            state: { 
              email: email.toLowerCase(),
              type: 'password-reset'
            }
          });
        }, 1500);
      } else {
        triggerToast(data.message || 'Failed to send reset code. Please try again.', 'danger');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      triggerToast('An error occurred. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground variant="auth" />
      
      {showToast && <Toast message={toastMessage} type={toastType} />}

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <GlassCard className="p-8" variant="primary" glow>
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-orange/20 to-neon-pink/20 flex items-center justify-center border-2 border-neon-orange/30"
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
                <Shield className="w-8 h-8 text-neon-orange" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
              <p className="text-white/70">
                No worries! Enter your email address and we'll send you a code to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-white/10 border-2 rounded-lg text-white placeholder:text-white/50 focus:outline-none transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-white/20 focus:border-neon-cyan/50'
                    }`}
                    placeholder="Enter your email address"
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassButton
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-neon-orange/20 to-neon-pink/20 border-neon-orange/30 text-white hover:from-neon-orange/30 hover:to-neon-pink/30"
                  glow
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader size={20} />
                      Sending Reset Code...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Send Reset Code
                    </div>
                  )}
                </GlassButton>
              </motion.div>
            </form>

            {/* Back to Login */}
            <motion.div variants={itemVariants} className="text-center mt-8">
              <p className="text-white/70 text-sm mb-4">
                Remember your password?
              </p>
              <GlassButton
                onClick={() => navigate('/login')}
                variant="ghost"
                className="gap-2 text-white/70 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </GlassButton>
            </motion.div>

            {/* Security Note */}
            <motion.div variants={itemVariants} className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-neon-cyan mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">Security Note</h4>
                  <p className="text-white/70 text-xs">
                    For your security, the reset code will expire in 5 minutes. 
                    If you don't receive the email, please check your spam folder.
                  </p>
                </div>
              </div>
            </motion.div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
