import React, { createContext, useState, useContext } from 'react';

const LoaderContext = createContext({
  showLoader: false,
  toggleLoader: (isVisible: boolean) => {},
});

export const LoaderProvider = ({ children }: React.PropsWithChildren) => {
  const [showLoader, setShowLoader] = useState(false);

  const toggleLoader = (isVisible: boolean): void => {
    setShowLoader(isVisible);
  };

  return (
    <LoaderContext.Provider value={{ showLoader, toggleLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export function useLoading() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}
