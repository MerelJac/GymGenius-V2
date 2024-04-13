import React from 'react';

export default function Profile({profile, logOut}) {

    return (

        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
        </div>
    );
}

