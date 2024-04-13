import { useState } from 'react';

const useAuth = () => {
  const [auth, setAuth] = useState(false);

  // Function to log in the user
  const login = () => {
    // Add your login logic here, such as setting auth to true after successful login
    setAuth(true);
  };

  // Function to log out the user
  const logout = () => {
    // Add your logout logic here, such as setting auth to false
    setAuth(false);
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return auth;
  };

  // Return the state and functions to update it
  return {
    auth,
    login,
    logout,
    isAuthenticated
  };
};

export default useAuth;
