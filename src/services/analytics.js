import axios from 'axios';

  const API_URL = import.meta.env.VITE_API_URL;
    if (!API_URL) {
      throw new Error('API URL is not defined');
    }

// Create axios instance with default config
const analyticsAPI = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
analyticsAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Analytics API Error:', error);
    return Promise.reject(error);
  }
);

export const analyticsService = {
  // Get dashboard statistics
  async getDashboardStats(userId) {
    try {
      const response = await analyticsAPI.get(`/analytics/dashboard/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },

  // Get recent activity
  async getRecentActivity(userId, limit = 10) {
    try {
      const response = await analyticsAPI.get(`/analytics/activity/${userId}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },

  // Get performance metrics
  async getPerformanceMetrics(userId) {
    try {
      const response = await analyticsAPI.get(`/analytics/performance/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },

  // Get device analytics
  async getDeviceAnalytics(userId) {
    try {
      const response = await analyticsAPI.get(`/analytics/devices/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching device analytics:', error);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },

  // Get location analytics
  async getLocationAnalytics(userId) {
    try {
      const response = await analyticsAPI.get(`/analytics/locations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching location analytics:', error);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },

  // Get security analytics
  async getSecurityAnalytics(userId) {
    try {
      const response = await analyticsAPI.get(`/analytics/security/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching security analytics:', error);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  },
};

export default analyticsService;
