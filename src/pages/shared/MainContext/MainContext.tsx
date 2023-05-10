import { ReactNode, createContext, useMemo } from 'react';
import getBrowserAPIs from '../../../shared/web-extension';
import { extensionRedirect } from '../../../shared/utils';
import type { ExtensionRedirect } from '../../../shared/utils/extensionRedirect';

type MainContextProps = {
  browserAPIs: BrowserAPIs;
  sendMessage: RuntimeWrapper['sendMessage'];
  redirect: ReturnType<ExtensionRedirect>;
};

export const Context = createContext<MainContextProps>({
  browserAPIs: null as never,
  redirect: null as never,
  sendMessage: null as never,
});

const MainContext = ({ children }: { children: ReactNode }) => {
  const contextValue = useMemo(() => {
    const browserAPIs = getBrowserAPIs();
    return {
      browserAPIs,
      sendMessage: browserAPIs.runtime.sendMessage,
      redirect: extensionRedirect(browserAPIs),
    };
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default MainContext;
