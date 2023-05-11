import { useEffect, useState } from 'react';
import useBrowserAPIs from '@/pages/_shared/MainContext/useBrowserAPIs';
import { domainMessageCreators } from '@/shared/messages';
import Domain from '../Domain';

type DomainListProps = {
  onEdit: (domain: DomainEntry) => void;
  onDelete: (domain: string) => void;
  onDownload: (domain: string) => void;
};

const DomainList = ({ onEdit, onDelete, onDownload }: DomainListProps) => {
  const { storageListener, sendMessage } = useBrowserAPIs();
  const [mainDomain, setMainDomain] = useState('');
  const [registeredDomains, setRegisteredDomains] = useState<DomainEntry[]>([]);

  useEffect(() => {
    const unregister = storageListener.onDomainsChanged(setRegisteredDomains);
    return unregister;
  }, [storageListener]);

  useEffect(() => {
    const getDomains = async () => {
      const response = await sendMessage(domainMessageCreators.get(undefined));
      setMainDomain(response.mainDomain);
      setRegisteredDomains(response.registeredDomains);
    };
    getDomains();
  }, [sendMessage]);

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
