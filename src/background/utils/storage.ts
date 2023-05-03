import getBrowserAPIs from '../api/web-extension';
import Keys from '../api/web-extension/storageKeys';
import { getHTTPSURLString } from './url';

const browserAPIs = getBrowserAPIs();

type StorageValues = Record<string, any>;

export const setStorageValues = (values: StorageValues) => {
  return browserAPIs.storage.set(values);
};

export const getStorageValues = async (keys: string[]): Promise<StorageValues> => {
  return browserAPIs.storage.get(keys);
};

export const getMainDomain = async (): Promise<string> => {
  const values = await browserAPIs.storage.get([Keys.MainDomain]);
  return values[Keys.MainDomain] || '';
};

export const getRegisteredDomains = async (): Promise<DomainEntry[]> => {
  const values = await browserAPIs.storage.get([Keys.Domains]);
  return values[Keys.Domains] || [];
};

const setRegisteredDomains = (domains: DomainEntry[]) => {
  browserAPIs.storage.set({ [Keys.Domains]: domains });
};

export const upsertRegisteredDomain = async (domainEntry: DomainEntry): Promise<boolean> => {
  if (!domainEntry.domain) {
    return false;
  }

  const registeredDomains = await getRegisteredDomains();
  const domainIndex = registeredDomains.findIndex(
    (registeredDomain) => registeredDomain.domain === domainEntry.domain
  );

  const isDomainRegistered = domainIndex !== -1;

  if (isDomainRegistered) {
    const newDomains = [
      ...registeredDomains.slice(0, domainIndex),
      domainEntry,
      ...registeredDomains.slice(domainIndex + 1),
    ];
    setRegisteredDomains(newDomains);
    return true;
  }

  setRegisteredDomains([...registeredDomains, domainEntry]);
  return true;
};

export const deleteRegisteredDomain = async (domain: string): Promise<boolean> => {
  const registeredDomains = await getRegisteredDomains();
  const newRegisteredDomains = registeredDomains.filter(
    (registeredDomain) => registeredDomain.domain !== domain
  );
  setRegisteredDomains(newRegisteredDomains);
  return true;
};

const buildGetDomainInput = () => {
  let mainDomain = '';

  const init = async () => {
    mainDomain = await getMainDomain();
  };

  const buildGetInput = (input: string) => {
    return input.startsWith(`${mainDomain}/`) ? input : `${mainDomain}/${input}`;
  };

  init();

  return buildGetInput;
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
    return getHTTPSURLString(searchTerm);
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

export const getDomainInput = buildGetDomainInput();

export const getShortLinkURL = buildGetShortLinkURL();
