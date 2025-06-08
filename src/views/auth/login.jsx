import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CiMail, CiLock } from 'react-icons/ci';
import Toast from "@/components/toastmsg";
import { Loader } from "@/components/loader";
import GlassCard from "@/components/glass/GlassCard";
import GlassButton from "@/components/glass/GlassButton";
import GlassInput from "@/components/glass/GlassInput";
import AnimatedBackground from "@/components/backgrounds/AnimatedBackground";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
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

  // Handle success messages from other pages
  useEffect(() => {
    if (location.state?.message) {
      triggerToast(location.state.message, 'success');
      if (location.state.email) {
        setEmail(location.state.email);
      }
      // Clear the state to prevent showing the message again
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};
    
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('sessionToken', data.sessionToken);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        triggerToast(`${data.message || 'Account login successful'} `, 'success')
        navigate('/dashboard');
        console.log('Login successful');
      } else {
        const errorData = await response.json();
        triggerToast(`${errorData.message || 'An error occurred during login'} `, 'danger')
      }
    } catch (error) {
      console.log(error);
      triggerToast(`An error occurred during login `, 'danger')
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
            className="text-4xl font-bold text-neon-cyan mb-2"
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
          </motion.h1>
          <p className="text-white/70 text-lg">Secure Device Management</p>
        </motion.div>

        {/* Login Form */}
        <motion.div variants={itemVariants}>
          <GlassCard className="p-8" variant="primary" glow>
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Welcome Back
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  variant="primary"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={CiLock}
                  error={errors.password}
                  disabled={loading}
                  variant="primary"
                />
              </motion.div>

              <motion.div 
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-neon-cyan focus:ring-neon-cyan"
                    disabled={loading}
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-neon-cyan hover:text-neon-purple transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <GlassButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                  loading={loading}
                  glow={true}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </GlassButton>
              </motion.div>
            </form>

            <motion.div 
              className="mt-6 pt-6 border-t border-white/10 text-center"
              variants={itemVariants}
            >
              <p className="text-white/70">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-neon-cyan hover:text-neon-purple transition-colors font-medium"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Additional Features */}
        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-4 text-white/50 text-sm">
            <span>Secure</span>
            <span>•</span>
            <span>Encrypted</span>
            <span>•</span>
            <span>Protected</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;