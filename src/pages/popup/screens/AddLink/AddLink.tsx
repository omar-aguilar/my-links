import useBrowserAPIs from '@/pages/_shared/MainContext/useBrowserAPIs';
import AddShortLink from '../../components/AddShortLink';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const AddLink = () => {
  const { redirect } = useBrowserAPIs();
  useDocumentTitle('Add New Link');

  const redirectOnAdded = (shortLinkEntry: ShortLinkEntry) => {
    redirect.resolver.setLink(shortLinkEntry.shortLink).go();
  };

  return (
    <>
      <h1>Add Short Link</h1>
      <AddShortLink onLinkAdded={redirectOnAdded} initShortLink="" />
    </>
  );
};

export default AddLink;
