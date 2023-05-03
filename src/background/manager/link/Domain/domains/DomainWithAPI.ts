const DomainWithAPI = (domain: string): LinkHandler => {
  return {
    urlFilter: [{ hostEquals: domain }],
    getLink(url) {
      const shortLink = `${url.hostname}${url.pathname}`;
      return shortLink;
    },
  };
};

export default DomainWithAPI;
