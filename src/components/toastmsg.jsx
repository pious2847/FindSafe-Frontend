/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

// Hook for managing toast state and functionality
const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, title) => {
    setToast({ message, title });
  };

  const hideToast = () => {
    setToast(null);
  };

  return { toast, showToast, hideToast };
};

// Toast component for rendering the toast UI
const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close the toast after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!toast) {
    return null;
  }

  return (
    <div className="toast">
      <h3>{toast.title}</h3>
      <p>{toast.message}</p>
    </div>
  );
};

// Function to show a toast message
const showToastMessage = (message, title) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { showToast, hideToast } = useToast();

  showToast(message, title);

  return (
    <Toast toast={{ message, title }} onClose={hideToast} />
  );
};

export default showToastMessage;