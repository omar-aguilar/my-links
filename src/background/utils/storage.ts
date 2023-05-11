import getBrowserAPIs from '@/shared/web-extension';
import Keys from '@/shared/web-extension/storageKeys';

const browserAPIs = getBrowserAPIs();

const getMainDomain = async (): Promise<string> => {
  const values = await browserAPIs.storage.get([Keys.MainDomain]);
  return values[Keys.MainDomain] || '';
};

const getRegisteredDomains = async (): Promise<DomainEntry[]> => {
  const values = await browserAPIs.storage.get([Keys.Domains]);
  return values[Keys.Domains] || [];
};

const setRegisteredDomains = (domains: DomainEntry[]) => {
  browserAPIs.storage.set({ [Keys.Domains]: domains });
};

const buildGetShortLinkURL = () => {
  let domains: string[] = [];

  const getDomains = (domainList: DomainEntry[]) => {
    return domainList.map(({ domain }) => domain);
  };

  const init = async () => {
    browserAPIs.storage.onChanged([Keys.Domains], (changes) => {
      domains = getDomains(changes[Keys.Domains]);
    });
    const values = await browserAPIs.storage.get([Keys.Domains]);
    domains = getDomains(values[Keys.Domains]);
  };

  const getShortLinkURL = (searchTerm: string): string => {
    const isShortLinkRe = new RegExp(`^(?:${domains.join('|')})/.`);
    const isValidLink = isShortLinkRe.test(searchTerm);
    if (!isValidLink) {
      return '';
    }
    return searchTerm;
  };

  init();

  return getShortLinkURL;
};

export const setMainDomain = async (mainDomain: string) => {
  browserAPIs.storage.set({ [Keys.MainDomain]: mainDomain });

  const registeredDomains = await getRegisteredDomains();
  const isMainDomainRegistered = registeredDomains.find(
    (registeredDomain) => registeredDomain.domain === mainDomain
  );
  if (isMainDomainRegistered) {
    return;
  }
  const newDomains = [...registeredDomains, { domain: mainDomain, description: 'Main Domain' }];
  setRegisteredDomains(newDomains);
};

export const onNonMainDomainsUpdated = (
  callback: (domains: string[]) => BrowserAPIUnregisterFn[]
) => {
  let unregisterFns: BrowserAPIUnregisterFn[] = [];

  const getDomains = (domainList: DomainEntry[]) => {
    return domainList.map(({ domain }) => domain);
  };

  const registerDomains = async (domains: string[]) => {
    const mainDomain = await getMainDomain();
    const filteredDomains = domains.filter((domain) => domain !== mainDomain);
    unregisterFns.forEach((unregister) => unregister());
    unregisterFns = callback(filteredDomains);
  };

  const init = async () => {
    browserAPIs.storage.onChanged([Keys.Domains], (changes) => {
      const domains = getDomains(changes[Keys.Domains]);
      registerDomains(domains);
    });
    const values = await browserAPIs.storage.get([Keys.Domains]);
    const domains = getDomains(values[Keys.Domains]);
    registerDomains(domains);
  };

  init();
};

export const getShortLinkURL = buildGetShortLinkURL();
