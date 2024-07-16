/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { fetchUserDevices } from "@/services/device";
import { getUserId } from "@/auth/auth";
import { Loader } from '../loader';
import DeviceCard from './DeviceCard';


const DeviceCardPage = () => {
    const [devices, setPhones] = useState([]);

        const fetchDevices = async () => {
          const userId = getUserId();
          const fetchedPhones = await fetchUserDevices(userId);
          setPhones(fetchedPhones);
        };
    
        useEffect(() => {
            fetchDevices();
          }, []);

      const handleUpdateSuccess = () => {
        fetchDevices(); // Refresh the devices list
      };
    


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {devices && devices.length > 0 ?(
             devices.map(device => (
                <DeviceCard key={device._id} device={device} onUpdateSuccess={handleUpdateSuccess} />
              ))
        ):(
            <div className="flex w-full gap-3 h-screen items-center justify-center">
                 <Loader size={30}/>
                 <p>Loading...</p>
            </div>
           
        )
       }
      </div>
    </div>
  );
};

export default DeviceCardPage;