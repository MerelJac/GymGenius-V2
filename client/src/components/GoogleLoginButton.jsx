import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const responseGoogle = (response) => {
    onSuccess(response.tokenId);
  };

  return (
    <div>
      <GoogleLogin
        clientId="117194930399-rk5mmhkta23ovi0odb2ioc0ik3944o9d.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginButton;
