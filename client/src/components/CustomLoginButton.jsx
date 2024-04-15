import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

function CustomLoginButton() {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google login successful', tokenResponse);
      // You can now use the tokenResponse to authenticate the user in your app
    },
    onError: () => {
      console.error('Google login failed');
      // Handle login errors here
    },
    flow: 'auth-code', // Use 'auth-code' for the authorization code flow
  });

  return (
    <button onClick={() => googleLogin()}>
      Sign in with Google 🚀
    </button>
  );
}

export default CustomLoginButton;