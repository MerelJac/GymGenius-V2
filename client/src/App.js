import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Header from './components/Header';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from './components/Profile'; 

function App() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState(null);

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
                        sessionStorage.setItem('user', res.data.id)
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
        sessionStorage.removeItem('user')
    };

    
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Profile profile={profile} logOut={logOut}/>,
        }
      ]);

    return (
        <div>
            <Header logOut={logOut} login={login} profile={profile}/>
            {profile ? (
                 <RouterProvider router={router} />
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
        
    );
}
export default App;