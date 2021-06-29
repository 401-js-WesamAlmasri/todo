import React from 'react';

import HomePage from './pages/HomePage/HomePage';
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
          </Switch>
        </Router>
      </SettingProvider>
    </>
  );
};

export default App;