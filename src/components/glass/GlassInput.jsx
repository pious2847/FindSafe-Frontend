import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GlassInput = ({ 
  label,
  error,
  icon: Icon,
  className = '',
  variant = 'default',
  size = 'md',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const variants = {
    default: 'bg-white/5 border-white/20 text-white placeholder:text-white/50',
    primary: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-200/50',
    secondary: 'bg-purple-500/10 border-purple-500/30 text-purple-100 placeholder:text-purple-200/50',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const focusStyles = isFocused ? {
    borderColor: error ? 'rgb(239 68 68 / 0.8)' : 'rgb(0 255 255 / 0.8)',
    boxShadow: error 
      ? '0 0 0 2px rgba(239, 68, 68, 0.2), 0 8px 25px rgba(0, 0, 0, 0.3)'
      : '0 0 0 2px rgba(0, 255, 255, 0.2), 0 8px 25px rgba(0, 0, 0, 0.3)',
  } : {};

  return (
    <div className="space-y-2">
      {label && (
        <motion.label
          className="block text-sm font-medium text-white/80"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
            <Icon size={18} />
          </div>
        )}
        
        <motion.input
          className={cn(
            // Base styles
            'w-full rounded-xl border backdrop-blur-md',
            'transition-all duration-300 ease-out',
            'focus:outline-none',
            
            // Icon padding
            Icon ? 'pl-10' : '',
            
            // Size
            sizes[size],
            
            // Variant
            variants[variant],
            
            // Error state
            error && 'border-red-500/50 bg-red-500/10',
            
            // Custom className
            className
          )}
          style={focusStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
          {...props}
        />
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>
      
      {error && (
        <motion.p
          className="text-sm text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default GlassInput;
