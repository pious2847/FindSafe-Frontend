/* eslint-disable no-unused-vars */
import React from 'react';

const bentoItems = [
  { id: 1, image: 'https://via.placeholder.com/150', title: 'Track Device', description: 'Track your lost device in real-time.' },
  { id: 2, image: 'https://via.placeholder.com/150', title: 'Secure Device', description: 'Ensure your device is secure.' },
  { id: 3, image: 'https://via.placeholder.com/150', title: 'Remote Lock', description: 'Lock your device remotely.' },
  { id: 4, image: 'https://via.placeholder.com/150', title: 'Erase Data', description: 'Erase all data remotely to protect your information.' },
  // Add more items as needed
];

const BentoGrid = () => {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bentoItems.map(item => (
        <div key={item.id} className=" shadow-md rounded-lg overflow-hidden">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover"/>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;
