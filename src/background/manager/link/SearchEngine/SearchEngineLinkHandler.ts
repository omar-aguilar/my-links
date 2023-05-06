import { getResolverURLFromShortLink } from '../../../utils';
import SearchEngineHandlerEnhancer from './SearchEngineHandlerEnhancer';

const SearchEngineLinkHandler = (browserAPIs: BrowserAPIs) => {
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
        const redirectURL = getResolverURLFromShortLink(browserAPIs.runtime, link);
        browserAPIs.tabs.update(tabId, { url: redirectURL });
      },
      { url: enhancedLinkHandler.urlFilter }
    );
  };
  return { register };
};

export default SearchEngineLinkHandler;
