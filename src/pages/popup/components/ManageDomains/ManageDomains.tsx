import { useState } from 'react';
import useBrowserAPIs from '@/pages/_shared/MainContext/useBrowserAPIs';
import { domainMessageCreators, shortLinkMessageCreators } from '@/shared/messages';
import getCSVFromEntries from '../../utils/getCSVFromEntries';
import DomainList from '../DomainList';
import DomainForm from '../DomainForm';
import proxy from '../Notification/proxy';

const ManageDomains = () => {
  const { sendMessage } = useBrowserAPIs();
  const [currentDomainEntry, setCurrentDomainEntry] = useState<DomainEntry | undefined>();

  const onAddDomain = async (domainEntry: DomainEntry) => {
    await sendMessage(domainMessageCreators.upsert(domainEntry));
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
    await sendMessage(domainMessageCreators.delete(domain));
    proxy.setNotification({
      type: 'success',
      message: `Domain ${domain} successfully deleted`,
    });
  };

  const onDownload = async (domain: string) => {
    const results = await sendMessage(shortLinkMessageCreators.search({ domain }));
    const csv = getCSVFromEntries(results.shortLinkEntries);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${domain}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
