import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    }
    return null; // Return null if tokenString is undefined or null
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
