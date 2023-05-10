import Keys from '../../../../shared/web-extension/storageKeys';

const DomainStorage = (browserAPIs: BrowserAPIs) => {
  const setRegisteredDomains = (domains: DomainEntry[]) => {
    browserAPIs.storage.set({ [Keys.Domains]: domains });
  };

  const getRegisteredDomains = async (): Promise<DomainEntry[]> => {
    const values = await browserAPIs.storage.get([Keys.Domains]);
    return values[Keys.Domains] || [];
  };

  const getMainDomain = async (): Promise<string> => {
    const values = await browserAPIs.storage.get([Keys.MainDomain]);
    return values[Keys.MainDomain] || '';
  };

  const deleteRegisteredDomain = async (domain: string): Promise<boolean> => {
    const registeredDomains = await getRegisteredDomains();
    const newRegisteredDomains = registeredDomains.filter(
      (registeredDomain) => registeredDomain.domain !== domain
    );
    setRegisteredDomains(newRegisteredDomains);
    return true;
  };

  const upsertRegisteredDomain = async (domainEntry: DomainEntry): Promise<boolean> => {
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

  return {
    upsertRegisteredDomain,
    deleteRegisteredDomain,
    getMainDomain,
    getRegisteredDomains,
  };
};

const StorageDomainAPI = (browserAPIs: BrowserAPIs): DomainsAPI => {
  const db = DomainStorage(browserAPIs);
  const getMainDomain: DomainsAPI['getMainDomain'] = async () => {
    const mainDomain = await db.getMainDomain();
    return Promise.resolve({
      success: true,
      data: mainDomain,
    });
  };

  const search: DomainsAPI['search'] = async (filters) => {
    const { prefix = '' } = filters || {};
    const registeredDomains = await db.getRegisteredDomains();
    const domainEntries = registeredDomains.filter((registeredDomain) =>
      registeredDomain.domain.startsWith(prefix)
    );
    return Promise.resolve({
      success: true,
      data: domainEntries,
    });
  };

  const upsert: DomainsAPI['upsert'] = async (domainEntry) => {
    const result = await db.upsertRegisteredDomain(domainEntry);
    return Promise.resolve({ success: result });
  };

  const remove: DomainsAPI['remove'] = async (domain) => {
    const result = await db.deleteRegisteredDomain(domain);
    return Promise.resolve({ success: result });
  };

  return {
    getMainDomain,
    search,
    upsert,
    remove,
  };
};

export default StorageDomainAPI;
