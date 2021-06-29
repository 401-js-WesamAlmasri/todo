import React from 'react';

import HomePage from './pages/HomePage/HomePage';
import SettingProvider from './context/settings/context';

const App = () => {
  return (
    <>
      <SettingProvider>
        <HomePage />
      </SettingProvider>
    </>
  );
};

export default App;