import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GlassButton = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'md',
  glow = false,
  disabled = false,
  loading = false,
  onClick,
  ...props 
}) => {
  const variants = {
    default: 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30',
    primary: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-100 hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]',
    secondary: 'bg-purple-500/20 border-purple-500/50 text-purple-100 hover:bg-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]',
    danger: 'bg-red-500/20 border-red-500/50 text-red-100 hover:bg-red-500/30 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    success: 'bg-green-500/20 border-green-500/50 text-green-100 hover:bg-green-500/30 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]',
    ghost: 'bg-transparent border-transparent text-white hover:bg-white/10 hover:border-white/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const glowClass = glow ? 'shadow-[0_0_15px_rgba(0,255,255,0.5)]' : '';

  return (
    <motion.button
      className={cn(
        // Base styles
        'relative overflow-hidden rounded-xl border backdrop-blur-md',
        'font-medium transition-all duration-300 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-cyan-500/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Size
        sizes[size],
        
        // Variant
        variants[variant],
        
        // Glow effect
        glowClass,
        
        // Custom className
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : {}}
      {...props}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          translateX: ['100%', '100%', '-100%', '-100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
};

export default GlassButton;
