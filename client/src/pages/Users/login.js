import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


export default function Login({login}) {
  const navigate = useNavigate()
return (
    <div>
      <button onClick={login}>Sign in with Google 🚀</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
    </div>
)
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};