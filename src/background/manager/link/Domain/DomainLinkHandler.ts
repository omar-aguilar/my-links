import type { ExtensionRedirect } from '../../../../shared/utils/extensionRedirect';

const DomainLinkHandler = (browserAPIs: BrowserAPIs, redirect: ReturnType<ExtensionRedirect>) => {
  const register = (linkHandler: LinkHandler) => {
    const unregister = browserAPIs.webNavigation.onBeforeNavigate(
      async (details) => {
        const { url, tabId } = details;
        const jsURL = new URL(url);
        const shortLink = linkHandler.getLink(jsURL);
        redirect.resolver.setLink(shortLink).setTabId(tabId).go();
      },
      { url: linkHandler.urlFilter }
    );
    return unregister;
  };
  return { register };
};

export default DomainLinkHandler;
