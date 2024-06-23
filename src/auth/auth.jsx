/* eslint-disable react-hooks/rules-of-hooks */
import { jwtDecode } from "jwt-decode";

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
  export const getUser = () => {
    const jwt = localStorage.getItem('token');
    const user = jwtDecode(jwt)
    return user
  };

export const handleLogout = () => {
  console.log('logout');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userId');
  };