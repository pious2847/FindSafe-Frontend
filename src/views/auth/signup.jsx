import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { CiMail, CiLock, CiUser } from 'react-icons/ci';
import Toast from "@/components/toastmsg";
import { Loader } from "@/components/loader";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import GlassInput from "@/components/glass/GlassInput";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [errors, setErrors] = useState({});

  const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setShowToast(false);
    setErrors({});
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        triggerToast(`${data.message || 'Account registered successfully! Please verify your email'} `, 'success');
        // Redirect to OTP verification page
        setTimeout(() => {
          navigate('/verify-otp', {
            state: {
              email: email.toLowerCase(),
              userId: data.userId
            }
          });
        }, 1500);
      } else {
        const errorData = await response.json();
        triggerToast(`${errorData.message || 'An error occurred during registration'} `, 'danger')
      }
    } catch (error) {
      console.log(error);
      triggerToast(`An error occurred during registration `, 'danger')
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground variant="auth" />
      
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
        />
      )}

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo/Brand Section */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-neon-purple mb-2"
            animate={{ 
              textShadow: [
                "0 0 10px #8b5cf6",
                "0 0 20px #8b5cf6", 
                "0 0 10px #8b5cf6"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            FindSafe
          </motion.h1>
          <p className="text-white/70 text-lg">Join the Security Revolution</p>
        </motion.div>

        {/* Signup Form */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-8" variant="secondary" glow>
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Create Account
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <GlassInput
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  icon={CiUser}
                  error={errors.username}
                  disabled={loading}
                  variant="secondary"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassInput
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={CiMail}
                  error={errors.email}
                  disabled={loading}
                  variant="secondary"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassInput
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={CiLock}
                  error={errors.password}
                  disabled={loading}
                  variant="secondary"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassInput
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  icon={CiLock}
                  error={errors.confirmPassword}
                  disabled={loading}
                  variant="secondary"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassButton
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                  loading={loading}
                  glow={true}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </GlassButton>
              </motion.div>
            </form>

            <motion.div 
              className="mt-6 pt-6 border-t border-white/10 text-center"
              variants={itemVariants}
            >
              <p className="text-white/70">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-neon-purple hover:text-neon-cyan transition-colors font-medium"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Security Features */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-4 text-white/50 text-sm">
            <span>256-bit Encryption</span>
            <span>•</span>
            <span>Zero-Knowledge</span>
            <span>•</span>
            <span>GDPR Compliant</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;