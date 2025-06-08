/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { fetchUserDevices } from "@/services/device";
import { getUserId } from "@/auth/auth";
import { Loader } from '../loader';
import DeviceCard from './DeviceCard';

const DeviceCardPage = ({ viewMode = 'grid', searchTerm = '', filterStatus = 'all', onDevicesUpdate }) => {
    const [devices, setPhones] = useState([]);
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        const fetchDevices = async () => {
          try {
            setLoading(true);
            setError(null);
            const userId = getUserId();

            if (!userId) {
              throw new Error('User not authenticated - no userId found');
            }

            const fetchedPhones = await fetchUserDevices(userId);
            setPhones(fetchedPhones || []);

            // Notify parent component of devices update
            if (onDevicesUpdate) {
              onDevicesUpdate(fetchedPhones || []);
            }
          } catch (err) {
            console.error('Error fetching devices:', err);
            setError(err.message);
            // No fallback data - show error state
          } finally {
            setLoading(false);
          }
        };

        useEffect(() => {
            fetchDevices();
          }, []);

      const handleUpdateSuccess = () => {
        fetchDevices(); // Refresh the devices list
      };

      // Filter devices based on search term and filter status
      useEffect(() => {
        let filtered = devices;

        // Apply search filter
        if (searchTerm) {
          filtered = filtered.filter(device =>
            device.devicename.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.modelNumber?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply status filter
        if (filterStatus !== 'all') {
          filtered = filtered.filter(device => {
            switch (filterStatus) {
              case 'online':
                return device.mode === 'active';
              case 'offline':
                return device.mode === 'inactive';
              case 'warning':
                return device.mode === 'disabled';
              default:
                return true;
            }
          });
        }

        setFilteredDevices(filtered);
      }, [devices, searchTerm, filterStatus]);
    


  if (loading) {
    return (
      <div className="flex w-full gap-3 items-center justify-center py-8">
        <Loader size={30}/>
        <p className="text-white/70">Loading devices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-2">Error loading devices: {error}</p>
        <p className="text-white/70 text-sm">Showing demo data</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {filteredDevices && filteredDevices.length > 0 ? (
        <div className={viewMode === 'grid' ?
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" :
          "space-y-4"
        }>
          {filteredDevices.map(device => (
            <DeviceCard key={device._id} device={device} onUpdateSuccess={handleUpdateSuccess} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-white/70">No devices found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DeviceCardPage;