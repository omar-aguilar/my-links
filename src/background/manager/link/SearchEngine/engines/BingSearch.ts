const BingSearch = (): SearchHandler => {
  const searchQueryParam = 'q';
  return {
    urlFilter: [{ hostSuffix: 'bing.com', pathContains: 'search' }],
    getSearchTerm: (url) => url.searchParams.get(searchQueryParam) || '',
  };
};

export default BingSearch;
