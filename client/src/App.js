
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './pages/Users/profile';
import Header from './components/Header/header';
import Login from './pages/Users/login';
import NotFound from './pages/Error/not-found';


function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const [auth, setAuth] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        auth(true)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setAuth(false);
    };

    return (
      <GoogleOAuthProvider clientId="117194930399-rk5mmhkta23ovi0odb2ioc0ik3944o9d.apps.googleusercontent.com">
        <BrowserRouter>
        <div className="App">
          <Header />
        <Routes>
        <Route path="/" element={<Login setUser={setUser} setProfile={setProfile} />} />
        {user ? (
          <>
            <Route path="/profile" element={<Profile profile={profile} login={login} logout={logOut}/>} />
          </>
        ) : (
          <Route path="*" element={<NotFound />} />
        )}
      </Routes>
    </div>
        </BrowserRouter>
        </GoogleOAuthProvider>
    );
}
export default App;

