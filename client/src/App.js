import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google';
import Header from './components/Header/header';
import Profile from './pages/Users/profile';
import Login from './pages/Users/login';
import NotFound from './pages/Error/not-found';
import axios from 'axios';

function App() {
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  const [auth, setAuth] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse); 
      setAuth(true);

    },
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

              })
              .catch((err) => console.log(err));
      }
  },
  [ user ]
);

useEffect(() => {
  console.log('Auth status updated:', auth);
}, [auth]);

useEffect(() => {
  console.log('User data updated:', user);
}, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
      googleLogout();
      setProfile([]);
      setUser([]);
      setAuth(false);
  };

  return (
    <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Login login={login}/>}
            />
          {auth ? (
            <Route
              path="/profile"
              element={<Profile profile={profile} logout={logOut}/>}
            />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
          </Routes>
        </div>
      </BrowserRouter>
      // <div>
      //     <h2>React Google Login</h2>
      //     <br />
      //     <br />
      //     {auth ? (
      //         <div>
      //             <img src={profile.picture} alt="user image" />
      //             <h3>User Logged in</h3>
      //             <p>Name: {profile.name}</p>
      //             <p>Email Address: {profile.email}</p>
      //             <br />
      //             <br />
      //             <button onClick={logOut}>Log out</button>
      //         </div>
      //     ) : (
      //         <button onClick={login}>Sign in with Google 🚀 </button>
      //     )}
      // setAuth={setAuth} setUser={setUser} setProfile={setProfile} user={user} profile={profile} auth={auth}
     // </div>
  );
}
export default App;
