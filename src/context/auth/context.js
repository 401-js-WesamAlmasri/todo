import React, { useState } from 'react';

export const authContext = React.createContext();

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem('access_token');
  };

  const login = (user, token) => {
    setUser(user);
    setLoggedIn(true);
    localStorage.setItem('access_token', token);
  };

  const state = {
    loggedIn,
    user,
    login,
    logout,
  };

  return (
    <authContext.Provider value={state}>{props.children}</authContext.Provider>
  );
};

export default AuthProvider;
