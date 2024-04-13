import React from 'react';
import PropTypes from 'prop-types';


export default function Login({login}) {

return (
    <div>
      <button onClick={login}>Sign in with Google 🚀</button>
    </div>
)
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};