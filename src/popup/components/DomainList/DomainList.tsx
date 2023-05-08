import { useEffect, useState } from 'react';
import getBrowserAPIs from '../../../background/api/web-extension';
import { domainMessageCreators } from '../../../background/manager/extension/Message';
import Keys from '../../../background/api/web-extension/storageKeys';
import Domain from '../Domain';

const browserAPIs = getBrowserAPIs();

type DomainListProps = {
  onEdit: (domain: DomainEntry) => void;
  onDelete: (domain: string) => void;
  onDownload: (domain: string) => void;
};

const DomainList = ({ onEdit, onDelete, onDownload }: DomainListProps) => {
  const [mainDomain, setMainDomain] = useState('');
  const [registeredDomains, setRegisteredDomains] = useState<DomainEntry[]>([]);

  useEffect(() => {
    const onChanged = (changes: StorageWrapper.Changes) => {
      const domains: DomainEntry[] = changes[Keys.Domains];
      setRegisteredDomains(domains);
    };
    const unregister = browserAPIs.storage.onChanged([Keys.Domains], onChanged);
    return unregister;
  }, []);

  useEffect(() => {
    const getDomains = async () => {
      const response = await browserAPIs.runtime.sendMessage(domainMessageCreators.get(undefined));
      setMainDomain(response.mainDomain);
      setRegisteredDomains(response.registeredDomains);
    };
    getDomains();
  }, []);

  return (
    <div>
      <h2>Domain List</h2>
      <ul className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 gap-2">
        {registeredDomains.map((registeredDomain) => (
          <li key={registeredDomain.domain}>
            <Domain
              domain={registeredDomain}
              isMainDomain={registeredDomain.domain === mainDomain}
              onDelete={onDelete}
              onEdit={onEdit}
              onDownload={onDownload}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainList;
