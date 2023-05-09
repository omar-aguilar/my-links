import { ReactNode, createContext, useMemo } from 'react';
import getBrowserAPIs from '../../../shared/web-extension';

type MainContextProps = {
  browserAPIs: BrowserAPIs;
};

export const Context = createContext<MainContextProps>({
  browserAPIs: null as never,
});

const MainContext = ({ children }: { children: ReactNode }) => {
  const contextValue = useMemo(
    () => ({
      browserAPIs: getBrowserAPIs(),
    }),
    []
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default MainContext;
