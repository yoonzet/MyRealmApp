import React from 'react';
import App from './App';
import realmContext from './src/db';

const AppWrapper = () => {
  const {RealmProvider} = realmContext;
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
};

export default AppWrapper;
