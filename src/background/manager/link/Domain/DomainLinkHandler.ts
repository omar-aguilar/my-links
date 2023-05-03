import { getResolverURLFromShortLink } from '../../../utils';

const DomainLinkHandler = (browserAPIs: BrowserAPIs) => {
  const register = (linkHandler: LinkHandler) => {
    const unregister = browserAPIs.webNavigation.onBeforeNavigate(
      async (details) => {
        const { url, tabId } = details;
        const jsURL = new URL(url);
        const shortLink = linkHandler.getLink(jsURL);
        const redirectURL = getResolverURLFromShortLink(browserAPIs.runtime, shortLink);
        browserAPIs.tabs.update(tabId, { url: redirectURL });
      },
      { url: linkHandler.urlFilter }
    );
    return unregister;
  };
  return { register };
};

export default DomainLinkHandler;
