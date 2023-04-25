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
        browserAPIs.tabs.update(tabId, { url: link });
      },
      { url: enhancedLinkHandler.urlFilter }
    );
  };
  return { register };
};

export default SearchEngineLinkHandler;
