import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Profile from './components/Profile'; 
import NotFound from "./pages/Error/NotFound";

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((res) => {
        setProfile(res.data);
        sessionStorage.setItem('user', res.data.id)
      })
      .catch((err) => console.error('Error fetching profile:', err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    sessionStorage.removeItem('user');
  };

  return (
    <Router>
      <div>
        <Header logOut={logOut} login={login} profile={profile}/>
        <Routes>
          {profile ? (
            <Route path="/profile" element={<Profile profile={profile} logOut={logOut}/>} />
          ) : (
            <Route path="*" element={<button onClick={() => login()}>Sign in with Google 🚀 </button>} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
