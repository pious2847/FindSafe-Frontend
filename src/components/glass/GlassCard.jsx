import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GlassCard = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  gradient = false,
  ...props 
}) => {
  const variants = {
    default: 'bg-white/5 border-white/20',
    dark: 'bg-black/20 border-white/10',
    light: 'bg-white/10 border-white/30',
    primary: 'bg-cyan-500/10 border-cyan-500/30',
    secondary: 'bg-purple-500/10 border-purple-500/30',
  };

  const hoverEffects = hover ? {
    whileHover: { 
      y: -2,
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    whileTap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  } : {};

  const glowClass = glow ? 'shadow-[0_0_20px_rgba(0,255,255,0.3)]' : '';
  const gradientClass = gradient ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10' : '';

  return (
    <motion.div
      className={cn(
        // Base glass styles
        'backdrop-blur-xl border rounded-2xl',
        'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
        'transition-all duration-300 ease-out',
        
        // Variant styles
        variants[variant],
        
        // Optional effects
        glowClass,
        gradientClass,
        
        // Hover effects
        hover && 'hover:bg-white/10 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]',
        
        // Custom className
        className
      )}
      {...hoverEffects}
      {...props}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
