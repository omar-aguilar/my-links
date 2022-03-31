const CustomDomain = (hostname: string): RawLinkHandler => {
  const urlFilter = { hostEquals: hostname };
  return {
    urlFilter,
    canHandleURL: (url) => url.hostname === urlFilter.hostEquals,
    getRawLink: (url) => url.href.replace(/^https?:\/\//, ''),
  };
};

export default CustomDomain;
