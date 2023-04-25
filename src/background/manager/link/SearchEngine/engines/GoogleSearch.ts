const GoogleSearch = (): SearchHandler => {
  const searchQueryParam = 'q';
  return {
    urlFilter: [{ hostSuffix: 'google.com', pathContains: 'search' }],
    getSearchTerm: (url) => url.searchParams.get(searchQueryParam) || '',
  };
};

export default GoogleSearch;
