import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

const EnhancedToast = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // Wait for exit animation
  };

  const getToastConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/50',
          textColor: 'text-green-400',
          iconColor: 'text-green-400',
        };
      case 'error':
      case 'danger':
        return {
          icon: AlertCircle,
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/50',
          textColor: 'text-red-400',
          iconColor: 'text-red-400',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-orange-500/20',
          borderColor: 'border-orange-500/50',
          textColor: 'text-orange-400',
          iconColor: 'text-orange-400',
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-500/20',
          borderColor: 'border-blue-500/50',
          textColor: 'text-blue-400',
          iconColor: 'text-blue-400',
        };
    }
  };

  const config = getToastConfig(type);
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`
            fixed top-4 right-4 z-[9999] max-w-md w-full
            ${config.bgColor} ${config.borderColor} ${config.textColor}
            backdrop-blur-md border rounded-xl p-4 shadow-2xl
            pointer-events-auto
          `}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-relaxed">
                {message}
              </p>
            </div>
            
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/70 hover:text-white" />
            </button>
          </div>
          
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-current opacity-30 rounded-b-xl"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast container component
const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  // Global toast function
  window.showToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove after duration + animation time
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration + 500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-[9999] p-4 space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut",
              delay: index * 0.1 
            }}
            style={{ zIndex: 9999 - index }}
          >
            <EnhancedToast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { EnhancedToast, ToastContainer };
export default EnhancedToast;
