import { ReactNode, createContext, useMemo } from 'react';
import getBrowserAPIs from '../../../shared/web-extension';
import { extensionRedirect, storageListener } from '../../../shared/utils';

type MainContextProps = {
  sendMessage: RuntimeWrapper['sendMessage'];
  redirect: ReturnType<typeof extensionRedirect>;
  storageListener: ReturnType<typeof storageListener>;
};

export const Context = createContext<MainContextProps>({
  redirect: null as never,
  sendMessage: null as never,
  storageListener: null as never,
});

const MainContext = ({ children }: { children: ReactNode }) => {
  const contextValue = useMemo(() => {
    const browserAPIs = getBrowserAPIs();
    return {
      sendMessage: browserAPIs.runtime.sendMessage,
      redirect: extensionRedirect(browserAPIs),
      storageListener: storageListener(browserAPIs),
    };
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default MainContext;
