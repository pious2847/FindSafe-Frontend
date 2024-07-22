import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
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
    // console.error('Error fetching user devices:', error.message);
    // throw error; // Re-throw the error to handle it in the calling function
    return error.message;
  }
};

export const DeleteUserDevice = async(deviceId) =>{
  try{
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined');
    }

    const response = await axios.delete(`${apiUrl}/deletedevice/${deviceId}`);

    if (response.status != 200) {
      return await response.data['message'] || ''
    }
    const data = await response.data['message'];
    return data || '';
  }catch(error){
    // console.error('Error fetching user devices:', error.message);
    return 'Error deleting user devices'
  }
}