/* eslint-disable no-undef */
export const isAuthenticated = () => {
    const sessionToken = localStorage.getItem('sessionToken');
    return !!sessionToken;
  };
  
  export const getSessionToken = () => {
    return localStorage.getItem('sessionToken');
  };
  
  export const getUserId = () => {
    return localStorage.getItem('userId');
  };

export const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };