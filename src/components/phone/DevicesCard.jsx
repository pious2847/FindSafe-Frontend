import React from 'react';
import { FaPhone, FaBatteryFull, FaLock, FaTrash } from 'react-icons/fa';

const PhoneCard = ({ phone }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{phone.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          phone.status === 'online' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
        }`}>
          {phone.status}
        </span>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
        <FaPhone className="mr-2" />
        <span>{phone.number}</span>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
        <FaBatteryFull className="mr-2" />
        <span>{phone.battery}%</span>
      </div>
      <div className="flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center">
          <FaLock className="mr-2" /> Lock
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center">
          <FaTrash className="mr-2" /> Remove
        </button>
      </div>
    </div>
  </div>
);

const PhoneCardPage = () => {
  const phones = [
    { id: 1, name: 'iPhone 12', number: '+1 234 567 890', status: 'online', battery: 80 },
    { id: 2, name: 'Samsung Galaxy S21', number: '+1 987 654 321', status: 'offline', battery: 45 },
    { id: 3, name: 'Google Pixel 5', number: '+1 555 123 444', status: 'online', battery: 90 },
    { id: 4, name: 'OnePlus 9 Pro', number: '+1 333 999 777', status: 'online', battery: 70 },
    { id: 5, name: 'Xiaomi Mi 11', number: '+1 222 888 666', status: 'offline', battery: 20 },
    // Add more phones as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">My Devices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {phones.map(phone => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default PhoneCardPage;