// Debug utilities for troubleshooting dashboard issues

export const checkEnvironment = () => {
  const checks = {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'),
    apiUrl: import.meta.env.VITE_API_URL,
    googleMapsKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    nodeEnv: import.meta.env.NODE_ENV,
  };

  console.log('Environment Check:', checks);
  return checks;
};

export const testApiConnection = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error('VITE_API_URL not configured');
    }

    const response = await fetch(`${apiUrl}/api/test`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('API connection successful');
      return { success: true, status: response.status };
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error('API connection failed:', error);
    return { success: false, error: error.message };
  }
};

export const debugDashboard = () => {
  console.log('=== DASHBOARD DEBUG ===');
  
  // Check environment
  const env = checkEnvironment();
  
  // Check if user is authenticated
  const isAuthenticated = !!(env.userId && env.token);
  console.log('User authenticated:', isAuthenticated);
  
  // Check API configuration
  const apiConfigured = !!env.apiUrl;
  console.log('API configured:', apiConfigured);
  
  // Check Google Maps
  const mapsConfigured = !!env.googleMapsKey;
  console.log('Google Maps configured:', mapsConfigured);
  
  return {
    environment: env,
    isAuthenticated,
    apiConfigured,
    mapsConfigured,
  };
};

// Global debug function
window.debugDashboard = debugDashboard;
window.testApiConnection = testApiConnection;
