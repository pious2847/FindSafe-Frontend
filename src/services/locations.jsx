import axios from 'axios';

export const fetchDevicesLocations = async (deviceId) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined');
    }

    const response = await axios.get(`${apiUrl}/mobiledevices/${deviceId}/locations`);
    console.log(response);
    if (response.status != 200) {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
    const data = await response.data;

    return data || [];
  } catch (error) {
    console.error('Error fetching user devices:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const getLocationNames = async(lat, lon )=>{
  try {
    const response = axios.get(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`)
    console.log(response);

    if(await response.status != 200){

      throw new Error(`Unexpected Error: ${response.statusText}`);
      
    }
    const locationData = (await response).data.address.country

      return locationData || []
  } catch (error) {
    console.error('Error fetching user devices:', error);
    throw error;
  }
}