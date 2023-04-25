import ChromeOmniboxWrapper from './chrome/Omnibox';
import ChromeRuntimeWrapper from './chrome/Runtime';
import ChromeLocalStorageWrapper from './chrome/Storage';
import ChromeTabsWrapper from './chrome/Tabs';
import ChromeWebNavigationWrapper from './chrome/WebNavigation';

const ChromeAPIs = (() => {
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
})();

const getBrowserAPIs = (): BrowserAPIs => ChromeAPIs.getInstance();

export default getBrowserAPIs;
