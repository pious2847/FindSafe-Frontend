import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Shield, RefreshCw, ArrowLeft, CheckCircle } from 'lucide-react';
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";
import Toast from "@/components/toastmsg";
import { Loader } from "@/components/loader";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  
  // Get email from navigation state or URL params
  const email = location.state?.email || new URLSearchParams(location.search).get('email');
  
  const inputRefs = useRef([]);

  const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate('/signup');
    }
  }, [email, navigate]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    // Focus the last filled input or the first empty one
    const lastFilledIndex = newOtp.findIndex(val => val === '');
    const focusIndex = lastFilledIndex === -1 ? 5 : Math.max(0, lastFilledIndex - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      triggerToast('Please enter the complete 6-digit verification code', 'danger');
      return;
    }

    setLoading(true);
    setShowToast(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          otp: otpString, 
          email: email 
        }),
      });

      const data = await response.json();

      if (data.success) {
        triggerToast('Account verified successfully! Redirecting to login...', 'success');
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Account verified successfully! You can now login.',
              email: email 
            }
          });
        }, 2000);
      } else {
        triggerToast(data.message || 'Invalid verification code. Please try again.', 'danger');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      triggerToast('An error occurred during verification. Please try again.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setShowToast(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (data.success) {
        triggerToast('New verification code sent to your email!', 'success');
        setTimeLeft(300); // Reset timer
        setCanResend(false);
        setOtp(['', '', '', '', '', '']); // Clear current OTP
        inputRefs.current[0]?.focus(); // Focus first input
      } else {
        triggerToast(data.message || 'Failed to resend verification code. Please try again.', 'danger');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      triggerToast('An error occurred while resending the code. Please try again.', 'danger');
    } finally {
      setResendLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center border-2 border-neon-cyan/30"
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
                <Mail className="w-8 h-8 text-neon-cyan" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-2">Verify Your Account</h1>
              <p className="text-white/70 mb-4">
                We've sent a 6-digit verification code to
              </p>
              <p className="text-neon-cyan font-medium">{email}</p>
            </div>

            {/* OTP Input */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex gap-3 justify-center mb-4">
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-xl font-bold bg-white/10 border-2 border-white/20 rounded-lg text-white focus:border-neon-cyan/50 focus:outline-none transition-all duration-300"
                    whileFocus={{ scale: 1.05 }}
                    disabled={loading}
                  />
                ))}
              </div>
              
              {/* Timer */}
              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-white/70 text-sm">
                    Code expires in <span className="text-neon-orange font-medium">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <p className="text-red-400 text-sm">Verification code has expired</p>
                )}
              </div>
            </motion.div>

            {/* Verify Button */}
            <motion.div variants={itemVariants} className="mb-6">
              <GlassButton
                onClick={handleVerifyOTP}
                disabled={loading || otp.join('').length !== 6}
                className="w-full py-3 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border-neon-cyan/30 text-white hover:from-neon-cyan/30 hover:to-neon-purple/30"
                glow
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader size={20} />
                    Verifying...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Verify Account
                  </div>
                )}
              </GlassButton>
            </motion.div>

            {/* Resend Code */}
            <motion.div variants={itemVariants} className="text-center mb-6">
              <p className="text-white/70 text-sm mb-3">Didn't receive the code?</p>
              <GlassButton
                onClick={handleResendOTP}
                disabled={!canResend || resendLoading}
                variant="ghost"
                className="gap-2"
              >
                {resendLoading ? (
                  <>
                    <Loader size={16} />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Resend Code
                  </>
                )}
              </GlassButton>
            </motion.div>

            {/* Back to Signup */}
            <motion.div variants={itemVariants} className="text-center">
              <GlassButton
                onClick={() => navigate('/signup')}
                variant="ghost"
                className="gap-2 text-white/70 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Signup
              </GlassButton>
            </motion.div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
