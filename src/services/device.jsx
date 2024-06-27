

export const fetchUserDevices = async (userId) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('API URL is not defined');
    }

    const response = await fetch(`${apiUrl}/mobiledevices/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.mobileDevices || [];
  } catch (error) {
    console.error('Error fetching user devices:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
