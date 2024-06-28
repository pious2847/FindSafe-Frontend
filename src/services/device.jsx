import axios from 'axios';

export const fetchUserDevices = async (userId) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined');
    }

    const response = await axios.get(`${apiUrl}/mobiledevices/${userId}`);

    if (response.status != 200) {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }
    const data = await response.data['mobileDevices'];
    return data || [];
  } catch (error) {
    console.error('Error fetching user devices:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
