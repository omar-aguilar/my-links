import Keys from '../web-extension/storageKeys';

const storageListener = (browserAPIs: BrowserAPIs) => {
  const { storage } = browserAPIs;
  const onDomainsChanged = (callback: (domains: DomainEntry[]) => void) => {
    const unregister = storage.onChanged([Keys.Domains], (changes) => {
      const domains: DomainEntry[] = changes[Keys.Domains];
      callback(domains);
    });
    return unregister;
  };

  return {
    onDomainsChanged,
  };
};

export default storageListener;
