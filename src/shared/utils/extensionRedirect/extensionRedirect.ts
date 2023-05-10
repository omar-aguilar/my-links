import redirectBuilder from './redirectBuilder';
import { ExtensionRedirect } from './types';

const extensionRedirect: ExtensionRedirect = (browserAPIs: BrowserAPIs) => {
  const { runtime, tabs } = browserAPIs;
  const shortLinkQueryParam = 'shortLink';

  const updateTab = (url: string, tabId: number | null) => {
    if (tabId) {
      tabs.update(tabId, { url });
      return;
    }
    tabs.updateCurrent({ url });
  };

  return {
    resolver: redirectBuilder({
      go({ redirect, tabId }) {
        if (!redirect.link) {
          const fallback = runtime.getURL('popup.html');
          updateTab(fallback, tabId);
          return;
        }
        const resolverPage = new URL(runtime.getURL('resolver.html'));
        resolverPage.searchParams.set(shortLinkQueryParam, redirect.link);
        updateTab(resolverPage.href, tabId);
      },
    }),
    main: redirectBuilder({
      go({ redirect, tabId }) {
        if (!redirect.link) {
          const mainPage = new URL(runtime.getURL('popup.html'));
          const pathname = '/link-not-found';
          const searchParams = new URLSearchParams();
          searchParams.set(shortLinkQueryParam, redirect.fallback);
          // TODO: change hash router to browser router?
          mainPage.hash = `${pathname}?${searchParams.toString()}`;
          updateTab(mainPage.href, tabId);
          return;
        }
        updateTab(redirect.link, tabId);
      },
    }),
  };
};

export default extensionRedirect;
