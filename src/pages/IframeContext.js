import React, { createContext, useState, useContext } from 'react';

// Create context
const IframeContext = createContext();

// Create a provider component
export const IframeProvider = ({ children }) => {
  const [iframeSrc, setIframeSrc] = useState('');

  const updateIframeSrc = (iframeCode) => {
    console.log('Updating iframe source with code:', iframeCode);
    setIframeSrc(iframeCode);
  };

  return (
    <IframeContext.Provider value={{ iframeSrc, updateIframeSrc }}>
      {children}
    </IframeContext.Provider>
  );
};

// Custom hook to use IframeContext
export const useIframeContext = () => useContext(IframeContext);
