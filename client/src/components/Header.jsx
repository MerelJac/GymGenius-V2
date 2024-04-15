import React, { useEffect, useState } from 'react';

export default function Header({ profile, logOut, login }) {
    const [button, setButton] = useState();
    useEffect(() => {
      // Update the button state based on the profile prop
      if (profile) {
          setButton(<button onClick={logOut}>Log out</button>);
      } else {
          setButton(<button onClick={() => login()}>Sign in with Google 🚀</button>);
      }
  }, [ profile, login, logOut ]);
  
    return (
        <div className='flex flex-row'>
            <h2>Header</h2>
            {button}
        </div>
    );
}
