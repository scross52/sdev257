import { createContext, useContext } from 'react';

export const NetworkContext = createContext({
  isConnected: true,
});

export const useNetwork = () => useContext(NetworkContext);
