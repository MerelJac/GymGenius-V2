import React, { useEffect } from 'react';
import { useGoogleOneTapLogin } from '@react-oauth/google';

function OneTapLogin() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log('One Tap login successful', credentialResponse);
      // Handle the successful login here
    },
    onError: () => {
      console.error('One Tap login failed');
      // Handle login errors here
    },
    // Additional configuration options can be provided here
    auto_select: true, // Automatically prompt the user if they have a single session
  });

  return (
    <div>
      {/* Your component UI */}
    </div>
  );
}

export default OneTapLogin;