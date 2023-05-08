import { useState } from 'react';
import DomainList from '../DomainList/DomainList';
import DomainForm from '../DomainForm/DomainForm';
import getBrowserAPIs from '../../../background/api/web-extension';
import { domainMessageCreators } from '../../../background/manager/extension/Message';
import proxy from '../Notification/proxy';

const browserAPIs = getBrowserAPIs();

const ManageDomains = () => {
  const [currentDomainEntry, setCurrentDomainEntry] = useState<DomainEntry | undefined>();

  const onAddDomain = async (domainEntry: DomainEntry) => {
    await browserAPIs.runtime.sendMessage(domainMessageCreators.upsert(domainEntry));
    setCurrentDomainEntry(undefined);
    proxy.setNotification({
      type: 'success',
      message: `Domain ${domainEntry.domain} successfully added`,
    });
  };

  const onEditDomain = async (domainEntry: DomainEntry) => {
    setCurrentDomainEntry(domainEntry);
  };

  const onDeleteDomain = async (domain: string) => {
    await browserAPIs.runtime.sendMessage(domainMessageCreators.delete(domain));
    proxy.setNotification({
      type: 'success',
      message: `Domain ${domain} successfully deleted`,
    });
  };

  const onDownload = (domain: string) => {
    console.debug('TBI', { domain });
  };

  return (
    <>
      <DomainForm
        title="Register Domain"
        onAction={onAddDomain}
        buttonLabel={currentDomainEntry ? 'Update Domain' : 'Add Domain'}
        defaultValues={currentDomainEntry}
      />
      <DomainList onEdit={onEditDomain} onDelete={onDeleteDomain} onDownload={onDownload} />
    </>
  );
};

export default ManageDomains;
