import { getEmptyShortLinkEntry, parseRawShortLink } from '../../utils';

const notRegisteredAPI: ShortLinkAPI = {
  async resolve(shortLink: string) {
    return { success: false, data: getEmptyShortLinkEntry(shortLink) };
  },
  async search() {
    return { success: false, data: [] };
  },
  async add() {
    return { success: false };
  },
  async update() {
    return { success: false };
  },
  async remove() {
    return { success: false };
  },
};

const APIHandler = () => {
  const handlers = new Map<string, ShortLinkAPI>();

  const getDomainFromShortLink = (shortLink: string) => {
    const { domain } = parseRawShortLink(shortLink);
    return domain;
  };

  const getAPIForDomainFromShortLink = (shortLink: string) => {
    const domain = getDomainFromShortLink(shortLink);
    const api = handlers.get(domain);
    if (!api) {
      return notRegisteredAPI;
    }
    return api;
  };

  const apiWrapper: ShortLinkAPI = {
    async resolve(shortLink: string) {
      const api = getAPIForDomainFromShortLink(shortLink);
      return api.resolve(shortLink);
    },
    async search(shortLink, filters) {
      const api = getAPIForDomainFromShortLink(shortLink);
      return api.search(shortLink, filters);
    },
    async add(linkData) {
      const api = getAPIForDomainFromShortLink(linkData.shortLink);
      return api.add(linkData);
    },
    async update(linkData) {
      const api = getAPIForDomainFromShortLink(linkData.shortLink);
      return api.update(linkData);
    },
    async remove(shortLink) {
      const api = getAPIForDomainFromShortLink(shortLink);
      return api.remove(shortLink);
    },
  };

  const register = (domain: string, api: ShortLinkAPI) => {
    handlers.set(domain, api);
    return () => {
      handlers.delete(domain);
    };
  };

  return {
    register,
    api: apiWrapper,
  };
};

export default APIHandler;
