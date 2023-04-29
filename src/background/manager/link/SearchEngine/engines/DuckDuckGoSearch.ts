const DuckDuckGoSearch = (): SearchHandler => {
  const searchQueryParam = 'q';
  return {
    urlFilter: [{ hostSuffix: 'duckduckgo.com' }],
    getSearchTerm: (url) => url.searchParams.get(searchQueryParam) || '',
  };
};

export default DuckDuckGoSearch;
