const YahooSearch = (): RawLinkHandler => {
  const urlFilter = { hostSuffix: 'yahoo.com' };
  const searchQueryParam = 'p';
  return {
    urlFilter,
    canHandleURL: (url) => url.hostname.endsWith(urlFilter.hostSuffix),
    getRawLink: (url) => url.searchParams.get(searchQueryParam) || '',
  };
};

export default YahooSearch;
