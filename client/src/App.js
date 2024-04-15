import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <div>    
    <GoogleOAuthProvider clientId="117194930399-rk5mmhkta23ovi0odb2ioc0ik3944o9d.apps.googleusercontent.com">
     <SignIn />
    </GoogleOAuthProvider>
    </div>
  )
}
