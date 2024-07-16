/* eslint-disable react/prop-types */
import { FaMobile, FaCircle } from 'react-icons/fa';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import DeviceModeModal from '@/components/phone/devicemodal';
import { useState,  } from 'react';

const DeviceCard = ({ device, onUpdateSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        <img 
          src={device.image} 
          alt={device.devicename} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow">
          <FaCircle className={`text-sm ${
            device.mode === 'active' ? 'text-green-500' : 'text-red-500'
          }`} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{device.devicename}</h3>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <FaMobile className="mr-2" />
          <span>{device.modelNumber || 'Model number not available'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            device.mode === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {device.mode}
          </span>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition duration-300"
            >
              <MdModeEdit />
            </button>
            <button className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-300">
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
      <DeviceModeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        device={device}
        onUpdateSuccess={onUpdateSuccess}
      />
    </div>
  );
};

export default DeviceCard;