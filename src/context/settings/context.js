import React, { useState, useEffect } from 'react';

export const settingContext = React.createContext();

const SettingProvider = (props) => {
  const [hideCompleteItem, setHideCompleteItem] = useState(false);
  const [pageSize, setPageSize] = useState(3);
  const [sortField, setSortField] = useState('difficulty');

  const state = {
    hideCompleteItem,
    pageSize,
    sortField,
    setHideCompleteItem,
    setPageSize,
    setSortField,
  };
  
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('preferences'));
    if (savedPreferences) {
      setHideCompleteItem(() => savedPreferences.hideCompleteItem === 'true'? true : false);
      setPageSize(parseInt(savedPreferences.pageSize));
      setSortField(savedPreferences.sortField);
    }
  }, []);

  return (
    <settingContext.Provider value={state}>
      {props.children}
    </settingContext.Provider>
  );
};

export default SettingProvider;
