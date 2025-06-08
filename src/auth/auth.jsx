/* eslint-disable react-hooks/rules-of-hooks */
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);


export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};
export const getSessionToken = () => {
  return localStorage.getItem("sessionToken");
};

export const getUserId = () => {
  return localStorage.getItem("userId");
};
export const getUser = () => {
  try {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      return null;
    }
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const handleLogout = () => {
  console.log("logout");
  removeToken();
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("userId");
};



export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < Date.now() / 1000;
  } catch {
    return true;
  }
};

