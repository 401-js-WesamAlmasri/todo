import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import SettingPage from './pages/SettingPage/SettingPage';
import SettingProvider from './context/settings/context';
import AuthProvider from './context/auth/context';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>
      <AuthProvider>
        <SettingProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/settings' component={SettingPage} />
              <Route exact path='/login' component={AuthPage} />
              <Route exact path='/register' component={(props) => (<AuthPage register {...props} />)} />
            </Switch>
          </Router>
        </SettingProvider>
      </AuthProvider>
    </>
  );
};

export default App;
