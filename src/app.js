import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import SettingPage from './pages/SettingPage/SettingPage';
import SettingProvider from './context/settings/context';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>
      <SettingProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/settings' component={SettingPage} />
            <Route exact path='/login'>
              <AuthPage />
            </Route>
            <Route exact path='/register'>
              <AuthPage register />
            </Route>
          </Switch>
        </Router>
      </SettingProvider>
    </>
  );
};

export default App;