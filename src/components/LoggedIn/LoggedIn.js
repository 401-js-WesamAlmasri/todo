import React, { useContext, useEffect } from 'react';
import { authContext } from '../../context/auth/context';

const LoggedIn = (Component) => {
  const Wrapper = (props) => {
    const { loggedIn, user } = useContext(authContext);

    useEffect(() => {
      if (!loggedIn || !user.username){
        props.history.push('/login');
      }
    }, [loggedIn]);

    if (!loggedIn || !user.username) {
      return <div />;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default LoggedIn;
