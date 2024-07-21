/* eslint-disable react/prop-types */

import { useState,  } from 'react';

import Toast from '@/components/toastmsg';
import { Loader } from "@/components/loader";
import { DeleteUserDevice } from '@/services/device';


const DeviceModal = ({ isOpen, onClose, device, onUpdateSuccess }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

   const triggerToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleDeviceDelete =  async ()=>{
    setIsLoading(true);
    try{
      const responsemsg = await DeleteUserDevice(device._id);
      if (responsemsg){
        triggerToast(`${responsemsg} `, 'success')
        onUpdateSuccess();
        onClose();
      }
    }catch(error){
      triggerToast('Error updating device mode', 'danger')
      console.error('Error updating device mode:', error);
    }finally{
      setIsLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div>
        {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
        />
      )}
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 " onClick={onClose}>
  <div className=" border border-gray-700 p-6 bg-white dark:bg-gray-950 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-x w-[450px]">
    <div >
      <h2 className="text-lg font-semibold mb-2">Are you absolutely sure?</h2>
      <p className="text-gray-600 ">
        This action cannot be undone. This will permanently delete your
        device and remove your data from our servers.
      </p>
    </div>
    <div className=" flex justify-end space-x-3">
      <button className="border border-gray-700 px-5 py-2 rounded text-gray-300 hover:bg-gray-400 hover:bg-opacity-50 transition-colors" onClick={onClose}>
        Cancel
      </button>
      <button onClick={handleDeviceDelete} className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
      {isLoading ? <p className="flex items-center gap-2"><Loader size={30}/> Please Wait...</p> : 'Continue'}
      </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default DeviceModal;
