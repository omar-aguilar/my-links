const DomainWithAPI = (domain: string, api: ShortLinkAPI): LinkHandler => {
  return {
    urlFilter: [{ hostEquals: domain }],
    async getLink(url) {
      const shortLink = `${url.hostname}${url.pathname}`;
      const resolvedLink = await api.resolve(shortLink);
      return Promise.resolve(resolvedLink);
    },
  };
};

export default DomainWithAPI;
