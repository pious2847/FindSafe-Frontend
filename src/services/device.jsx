

export const fetchUserDevices = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/mobiledevices/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        const data = await response.json();
        return data.mobileDevices;
      } else {
        throw new Error('Unexpected Error Occurred');
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }