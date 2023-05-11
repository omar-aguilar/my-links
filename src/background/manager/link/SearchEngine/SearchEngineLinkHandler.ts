import SearchEngineHandlerEnhancer from './SearchEngineHandlerEnhancer';
import type { ExtensionRedirect } from '@/shared/utils/extensionRedirect';

const SearchEngineLinkHandler = (
  browserAPIs: BrowserAPIs,
  redirect: ReturnType<ExtensionRedirect>
) => {
  const register = (searchEngineLinkHandler: SearchHandler) => {
    const enhancedLinkHandler = SearchEngineHandlerEnhancer(searchEngineLinkHandler);
    browserAPIs.webNavigation.onBeforeNavigate(
      (details) => {
        const { url, tabId } = details;
        const jsURL = new URL(url);
        const link = enhancedLinkHandler.getSearchTerm(jsURL);
        if (!link) {
          return;
        }
        redirect.resolver.setLink(link).setTabId(tabId).go();
      },
      { url: enhancedLinkHandler.urlFilter }
    );
  };
  return { register };
};

export default SearchEngineLinkHandler;
