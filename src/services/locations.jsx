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
    // Validate input parameters
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      console.warn('Invalid coordinates provided:', { latitude, longitude });
      return {
        county: 'Invalid coordinates',
        name: 'Invalid coordinates'
      };
    }

    const Token = '2220506b0887c18d766a848e9818b703';
    const PROXY_URL = import.meta.env.VITE_API_PROXY_URL;
    console.log('Fetched Response Token', Token);

    if (!Token) {
      console.warn('API Token is not defined');
      return {
        county: `Location ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        name: `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
      };
    }

    if (!PROXY_URL) {
      console.warn('Proxy URL is not defined');
      return {
        county: `Location ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        name: `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
      };
    }

    const response = await axios.get(`${PROXY_URL}/v1/reverse?access_key=${Token}&query=${latitude},${longitude}`);
    console.log('Fetched Response', response);
    console.log('Response data structure:', JSON.stringify(response.data, null, 2));

    if (response.status !== 200) {
      throw new Error(`Unexpected Error: ${response.statusText}`);
    }

    // Check if response has the expected structure
    if (!response.data) {
      console.warn('No data in response');
      return {
        county: 'Unknown location',
        name: 'Unknown location'
      };
    }

    // Handle different possible response structures
    let locationData = {};

    if (response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      // Structure: { data: [{ ... }] }
      locationData = response.data.data[0];
    } else if (response.data.results && Array.isArray(response.data.results) && response.data.results.length > 0) {
      // Structure: { results: [{ ... }] }
      locationData = response.data.results[0];
    } else if (response.data.features && Array.isArray(response.data.features) && response.data.features.length > 0) {
      // GeoJSON structure: { features: [{ properties: { ... } }] }
      locationData = response.data.features[0].properties || response.data.features[0];
    } else if (typeof response.data === 'object' && !Array.isArray(response.data)) {
      // Direct object response
      locationData = response.data;
    } else {
      console.warn('Unexpected response structure:', response.data);
      return {
        county: 'Unknown location',
        name: 'Unknown location'
      };
    }

    return locationData || {
      county: 'Unknown location',
      name: 'Unknown location'
    };
  } catch (error) {
    console.error('Error fetching location name:', error);
    // Return fallback data with coordinates instead of throwing error
    const fallbackName = `Location ${latitude?.toFixed(4) || 'N/A'}, ${longitude?.toFixed(4) || 'N/A'}`;
    return {
      county: fallbackName,
      name: fallbackName,
      address: fallbackName,
      city: 'Unknown city',
      country: 'Unknown country',
      error: true
    };
  }
};

export const fetchDeviceLocationsWithNames = async (deviceId) => {
  try {
    const locations = await fetchDevicesLocations(deviceId);

    if (!Array.isArray(locations) || locations.length === 0) {
      console.warn('No locations found for device:', deviceId);
      return [];
    }

    const locationsWithNames = await Promise.all(locations.map(async (location) => {
      try {
        // Validate location data
        if (!location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
          console.warn('Invalid location data:', location);
          return {
            ...location,
            name: 'Invalid location',
            lastseen: 'Invalid location'
          };
        }

        const locationData = await getLocationNames(location.latitude, location.longitude);
        console.log('locationData', locationData);

        return {
          ...location,
          name: locationData.county || locationData.name || 'Unknown location',
          lastseen: locationData.name || locationData.county || 'Unknown location',
          address: locationData.label || locationData.display_name || 'Unknown address',
          city: locationData.city || locationData.locality || 'Unknown city',
          country: locationData.country || 'Unknown country'
        };
      } catch (locationError) {
        console.error('Error processing individual location:', locationError);
        return {
          ...location,
          name: 'Error loading location',
          lastseen: 'Error loading location',
          address: 'Error loading address',
          city: 'Unknown city',
          country: 'Unknown country'
        };
      }
    }));

    return locationsWithNames;
  } catch (error) {
    console.error('Error fetching locations with names:', error);
    // Return empty array instead of throwing error
    return [];
  }
};