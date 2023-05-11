import { getShortLinkURL } from '@/background/utils';

const SearchEngineHandlerEnhancer = (searchHandler: SearchHandler): SearchHandler => {
  const getSearchTerm = (url: URL) => {
    const searchTerm = searchHandler.getSearchTerm(url);
    const shortLink = getShortLinkURL(searchTerm);
    return shortLink;
  };

  return { ...searchHandler, getSearchTerm };
};

export default SearchEngineHandlerEnhancer;
