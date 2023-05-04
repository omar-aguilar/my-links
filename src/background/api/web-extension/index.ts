import ChromeAPIs from './chrome';
import BrowserAPIs from './browser';
import { BrowserAPIsSingleton } from './types';

const SingletonBrowserAPI = ((): BrowserAPIsSingleton => {
  let instance: BrowserAPIs;
  return {
    getInstance: () => {
      if (!instance) {
        instance =
          typeof globalThis.browser !== 'undefined'
            ? BrowserAPIs.getInstance()
            : ChromeAPIs.getInstance();
      }
      return instance;
    },
  };
})();

const getBrowserAPIs = (): BrowserAPIs => {
  return SingletonBrowserAPI.getInstance();
};

export default getBrowserAPIs;
