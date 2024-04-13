import { googleLogout } from '@react-oauth/google';

export const logOut = (props) => {
    googleLogout();
    props.setUser([]);
    props.setProfile([]);
    props.setAuth(false);
  };
