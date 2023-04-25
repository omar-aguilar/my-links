import getBrowserAPIs from '../api/web-extension';
import Keys from '../api/web-extension/storageKeys';

const browserAPIs = getBrowserAPIs();

const getMainDomain = async (): Promise<string> => {
  const values = await browserAPIs.storage.get([Keys.MainDomain]);
  return values[Keys.MainDomain] || '';
};

const buildGetDomainInput = () => {
  let mainDomain = '';

  const init = async () => {
    mainDomain = await getMainDomain();
  };

  const buildGetInput = (input: string) => `${mainDomain}/${input}`;

  init();

  return buildGetInput;
};

const buildGetShortLinkURL = () => {
  let domains: string[] = [];

  const init = async () => {
    browserAPIs.storage.onChanged([Keys.Domains], (changes) => {
      domains = changes[Keys.Domains];
    });
    const values = await browserAPIs.storage.get([Keys.Domains]);
    domains = values[Keys.Domains];
  };

  const getShortLinkURL = (searchTerm: string): string => {
    const isShortLinkRe = new RegExp(`^(?:${domains.join('|')})/.`);
    const isValidLink = isShortLinkRe.test(searchTerm);
    if (!isValidLink) {
      return '';
    }
    return `https://${searchTerm}`;
  };

  init();

  return getShortLinkURL;
};

export const setMainDomain = (mainDomain: string) => {
  browserAPIs.storage.get([Keys.Domains]).then((changes) => {
    const registeredDomains: string[] = changes[Keys.Domains] || [];
    if (registeredDomains.includes(mainDomain)) {
      return;
    }
    browserAPIs.storage.set({ [Keys.Domains]: [...registeredDomains, mainDomain] });
  });

  browserAPIs.storage.set({ [Keys.MainDomain]: mainDomain });
};

export const getDomainInput = buildGetDomainInput();

export const getShortLinkURL = buildGetShortLinkURL();
