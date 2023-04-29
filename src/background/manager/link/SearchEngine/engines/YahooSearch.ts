const YahooSearch = (): SearchHandler => {
  const searchQueryParam = 'p';
  return {
    urlFilter: [{ hostSuffix: 'yahoo.com' }],
    getSearchTerm: (url) => url.searchParams.get(searchQueryParam) || '',
  };
};

export default YahooSearch;
