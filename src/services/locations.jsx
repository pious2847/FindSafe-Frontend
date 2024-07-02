import axios from 'axios';

export const fetchDevicesLocations = async (deviceId) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined');
    }

    const response = await axios.get(`${apiUrl}/mobiledevices/${deviceId}/locations`);
    if (response.status !== 200) {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
    return response.data || [];
  } catch (error) {
    console.error('Error fetching device locations:', error);
    throw error;
  }
};

export const getLocationNames = async (latitude, longitude) => {
  try {
    const Token = '2220506b0887c18d766a848e9818b703';
    const PROXY_URL = import.meta.env.VITE_API_URL
    console.log('Fetched Resonse Token',Token)

    if (!Token) {
      throw new Error('API URL is not defined');
    }
    const response = await axios.get(`${PROXY_URL}/v1/reverse?access_key=${Token}&query=${latitude},${longitude}`);
    console.log('Fetched Resonse',response)

    if (response.status != 200) {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
    return response.data.data[0] || {};
  } catch (error) {
    console.error('Error fetching location name:', error);
    throw error;
  }
};

export const fetchDeviceLocationsWithNames = async (deviceId) => {
  try {
    const locations = await fetchDevicesLocations(deviceId);
    
    const locationsWithNames = await Promise.all(locations.map(async (location) => {
      const locationData = await getLocationNames(location.latitude, location.longitude);
      console.log('locationData',locationData)
      return {
        ...location,
        name: locationData.county || 'Unknown location',
        lastseen: locationData.name || 'Unknown location',
        // You can add more fields from locationData as needed
      };
    }));

    return locationsWithNames;
  } catch (error) {
    console.error('Error fetching locations with names:', error);
    throw error;
  }
};