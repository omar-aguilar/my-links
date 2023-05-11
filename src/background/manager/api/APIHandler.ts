import { getEmptyShortLinkEntry } from '@/background/utils';
import { parseShortLink } from '@/shared/utils';

const notRegisteredAPI: ShortLinkAPI = {
  async resolve() {
    return { success: false, data: '' };
  },
  async get(shortLink: string) {
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
    const { domain } = parseShortLink(shortLink);
    return domain;
  };

  const getAPIFromDomain = (domain: string) => {
    const api = handlers.get(domain);
    if (!api) {
      return notRegisteredAPI;
    }
    return api;
  };

  const getAPIForDomainFromShortLink = (shortLink: string) => {
    const domain = getDomainFromShortLink(shortLink);
    return getAPIFromDomain(domain);
  };

  const apiWrapper: ShortLinkAPI = {
    async resolve(shortLink: string) {
      const api = getAPIForDomainFromShortLink(shortLink);
      return api.resolve(shortLink);
    },
    async get(shortLink: string) {
      const api = getAPIForDomainFromShortLink(shortLink);
      return api.get(shortLink);
    },
    async search(domain, filters) {
      const api = getAPIFromDomain(domain);
      return api.search(domain, filters);
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
