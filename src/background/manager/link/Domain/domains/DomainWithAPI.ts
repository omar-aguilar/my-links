const DomainWithAPI = (domain: string, api: ShortLinkAPI): LinkHandler => {
  return {
    urlFilter: [{ hostEquals: domain }],
    async getLink(url) {
      const shortLink = `${url.hostname}${url.pathname}`;
      const { data: resolvedLink } = await api.resolve(shortLink);
      return resolvedLink;
    },
  };
};

export default DomainWithAPI;
