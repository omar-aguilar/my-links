import { getRedirectURLFromShortLinkEntry } from '../../../utils';

const DomainLinkHandler = (browserAPIs: BrowserAPIs) => {
  const register = (linkHandler: LinkHandler) => {
    const unregister = browserAPIs.webNavigation.onBeforeNavigate(
      async (details) => {
        const { url, tabId } = details;
        const jsURL = new URL(url);
        const shortLinkEntry = await linkHandler.getLink(jsURL);
        const redirectURL = getRedirectURLFromShortLinkEntry(browserAPIs.runtime, shortLinkEntry);
        browserAPIs.tabs.update(tabId, { url: redirectURL });
      },
      { url: linkHandler.urlFilter }
    );
    return unregister;
  };
  return { register };
};

export default DomainLinkHandler;
