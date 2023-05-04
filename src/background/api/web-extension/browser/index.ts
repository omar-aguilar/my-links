import { BrowserAPIsSingleton } from '../types';
import BrowserOmniboxWrapper from './Omnibox';
import BrowserRuntimeWrapper from './Runtime';
import BrowserLocalStorageWrapper from './Storage';
import BrowserTabsWrapper from './Tabs';
import BrowserWebNavigationWrapper from './WebNavigation';

const BrowserAPIs = (): BrowserAPIsSingleton => {
  let browserAPIs: BrowserAPIs | null = null;

  const getInstance = (): BrowserAPIs => {
    if (browserAPIs === null) {
      browserAPIs = {
        storage: BrowserLocalStorageWrapper(),
        webNavigation: BrowserWebNavigationWrapper(),
        runtime: BrowserRuntimeWrapper(),
        tabs: BrowserTabsWrapper(),
        omnibox: BrowserOmniboxWrapper(),
      };
    }
    return browserAPIs;
  };
  return { getInstance };
};

export default BrowserAPIs();
