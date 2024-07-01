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
    const Token =await import.meta.env.POSITIONSTACK_API;
    console.log('Fetched Resonse Token',Token)

    if (!Token) {
      throw new Error('API URL is not defined');
    }
    const response = await axios.get(`https://api.positionstack.com/v1/reverse?access_key=${Token}&query=${latitude},${longitude}`);
    console.log('Fetched Resonse',response)

    if (response.status != 200) {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
    return response.data || {};
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
      return {
        ...location,
        name: locationData.display_name || 'Unknown location',
        // You can add more fields from locationData as needed
      };
    }));

    return locationsWithNames;
  } catch (error) {
    console.error('Error fetching locations with names:', error);
    throw error;
  }
};