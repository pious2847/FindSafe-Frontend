/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';

const Toast = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Disappear after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const headerColor = type === 'danger' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="fixed top-0 right-0 p-3 ">
      <div className="w-[350px] rounded-lg shadow-lg bg-white overflow-hidden">
        <div className={`${headerColor} px-4 py-2 flex justify-between items-center`}>
          <strong className="text-white">Notification</strong>
          <div className="flex items-center">
            <small className="text-white mr-2">Just now</small>
            <button 
              onClick={() => setIsVisible(false)}
              className=" focus:outline-none"
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="px-4 py-3 text-black">
            
          {message}
        </div>
      </div>
    </div>
  );
};

export default Toast;