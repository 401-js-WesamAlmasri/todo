import React, { useState } from 'react';

export const settingContext = React.createContext();

const SettingProvider = (props) => {
  const [hideCompleteItem, setHideCompleteItem] = useState(true);
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

  return (
    <settingContext.Provider value={state}>
      {props.children}
    </settingContext.Provider>
  );
};

export default SettingProvider;
