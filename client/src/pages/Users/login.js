import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';



export default function Login(setUser) {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

  return (
    <div>

    <button onClick={login}>Sign in with Google 🚀 </button>

    </div>
  )
}
