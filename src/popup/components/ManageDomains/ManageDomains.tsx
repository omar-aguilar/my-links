import { useState } from 'react';
import DomainList from '../DomainList/DomainList';
import DomainForm from '../DomainForm/DomainForm';
import getBrowserAPIs from '../../../background/api/web-extension';
import { domainMessageCreators } from '../../../background/manager/extension/Message';

const browserAPIs = getBrowserAPIs();

const ManageDomains = () => {
  const [currentDomainEntry, setCurrentDomainEntry] = useState<DomainEntry | undefined>();

  const onAddDomain = async (domainEntry: DomainEntry) => {
    const response = await browserAPIs.runtime.sendMessage(
      domainMessageCreators.upsert(domainEntry)
    );
    setCurrentDomainEntry(undefined);
    console.log({ response });
  };

  const onEditDomain = async (domainEntry: DomainEntry) => {
    setCurrentDomainEntry(domainEntry);
  };

  const onDeleteDomain = async (domain: string) => {
    const response = await browserAPIs.runtime.sendMessage(domainMessageCreators.delete(domain));
    console.log({ response });
  };

  const onDownload = (domain: string) => {
    console.log('TBI', { domain });
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
