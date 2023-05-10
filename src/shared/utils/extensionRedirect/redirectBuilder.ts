import simpleRedirect from './simpleRedirect';
import { GoStrategy, RedirectBuilder } from './types';

const redirectBuilder: RedirectBuilder = (goStrategy: GoStrategy) => {
  const redirect = simpleRedirect();
  let tabId: number | null = null;

  return {
    setLink(url: string) {
      redirect.setLink(url);
      return this;
    },
    setFallback(url: string) {
      redirect.setFallback(url);
      return this;
    },
    setTabId(id: number) {
      tabId = id;
      return this;
    },
    go() {
      goStrategy.go({ redirect, tabId });
    },
    get link() {
      return redirect.link;
    },
    get fallback() {
      return redirect.fallback;
    },
    get tabId() {
      return tabId;
    },
  };
};

export default redirectBuilder;
