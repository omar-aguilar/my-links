const GoogleSearch = (): RawLinkHandler => {
  const urlFilter = { hostSuffix: 'google.com' };
  const searchQueryParam = 'q';
  return {
    urlFilter,
    canHandleURL: (url) => url.hostname.endsWith(urlFilter.hostSuffix),
    getRawLink: (url) => url.searchParams.get(searchQueryParam) || '',
  };
};

export default GoogleSearch;
