import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

export const authContext = React.createContext();

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem('access_token');
    cookie.remove('access_token');
  };

  const login = (user, token) => {
    setUser(user);
    setLoggedIn(true);
    localStorage.setItem('access_token', token);
    cookie.save('access_token', token);
  };

  const validateToken = (token) => {
    const user = jwt.decode(token);
    if (user) {
      setUser(user);
      setLoggedIn(true);
    }
  };

  useEffect(() => {
    const token = cookie.load('access_token');
    if (token) validateToken(token);
  }, []);

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
