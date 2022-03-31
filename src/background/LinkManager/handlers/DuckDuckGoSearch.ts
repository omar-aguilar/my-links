const DuckDuckGoSearch = (): RawLinkHandler => {
  const urlFilter = { hostSuffix: 'duckduckgo.com' };
  const searchQueryParam = 'q';
  return {
    urlFilter,
    canHandleURL: (url) => url.hostname.endsWith(urlFilter.hostSuffix),
    getRawLink: (url) => url.searchParams.get(searchQueryParam) || '',
  };
};

export default DuckDuckGoSearch;
