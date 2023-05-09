import { BrowserAPIsSingleton } from '../types';
import ChromeOmniboxWrapper from './Omnibox';
import ChromeRuntimeWrapper from './Runtime';
import ChromeLocalStorageWrapper from './Storage';
import ChromeTabsWrapper from './Tabs';
import ChromeWebNavigationWrapper from './WebNavigation';

const ChromeAPIs = (): BrowserAPIsSingleton => {
  let chromeAPIs: BrowserAPIs | null = null;

  const getInstance = (): BrowserAPIs => {
    if (chromeAPIs === null) {
      chromeAPIs = {
        storage: ChromeLocalStorageWrapper(),
        webNavigation: ChromeWebNavigationWrapper(),
        runtime: ChromeRuntimeWrapper(),
        tabs: ChromeTabsWrapper(),
        omnibox: ChromeOmniboxWrapper(),
      };
    }
    return chromeAPIs;
  };
  return { getInstance };
};

export default ChromeAPIs();
