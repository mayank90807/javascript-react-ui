import React from 'react';

const LocalStorageOps = WrappedComponent => (props) => {
  const setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  const getItem = key => localStorage.getItem(key);

  const deleteItem = (key) => {
    localStorage.removeItem(key);
  };
  const deleteLocalStorage = () => {
    localStorage.clear();
  };
  const innerProps = {
    setItem,
    getItem,
    deleteItem,
    deleteLocalStorage,
  };
  return <WrappedComponent {...innerProps} {...props} />;
};

export default LocalStorageOps;
