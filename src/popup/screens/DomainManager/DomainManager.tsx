import ManageDomains from '../../components/ManageDomains';

import useDocumentTitle from '../../hooks/useDocumentTitle';

const DomainManager = () => {
  useDocumentTitle('Domain Manager');

  return (
    <>
      <h1>Domain Manager</h1>
      <ManageDomains />
    </>
  );
};

export default DomainManager;
