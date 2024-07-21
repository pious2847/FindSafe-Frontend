/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react'; // Assuming you're using Headless UI for the switch
import Toast from '@/components/toastmsg';
import { Loader } from "@/components/loader";


const DeviceModeModal = ({ isOpen, onClose, device, onUpdateSuccess }) => {
  const [isActive, setIsActive] = useState(device.mode === 'active');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

   const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  useEffect(() => {
    setIsActive(device.mode === 'active');
  }, [device]);

  const handleModeChange = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/devicemode/${device.user}/${device._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: isActive ? 'active' :  'disable' }),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        triggerToast(`${data.message} `, 'success')
        onUpdateSuccess();
        onClose();
      } else {
        triggerToast('Failed to update device mode', 'danger')
        throw new Error('Failed to update device mode');
      }
    } catch (error) {
        triggerToast('Error updating device mode', 'danger')
      console.error('Error updating device mode:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
        />
      )}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Update Device Mode</h2>
        <div className="flex justify-between items-center mb-4">
          <span>Active</span>
          <Switch
            checked={isActive}
            onChange={() => setIsActive(true)}
            className={`${
              isActive ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span className={`${isActive ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span>Disable</span>
          <Switch
            checked={!isActive}
            onChange={() => setIsActive(false)}
            className={`${
              !isActive ? 'bg-red-600' : 'bg-gray-400'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
          >
            <span className={`${!isActive ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
          </Switch>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleModeChange}
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? <p className="flex items-center gap-2"><Loader size={30}/> updating...</p> : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceModeModal;