import AddShortLink from '../../components/AddShortLink';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import getHTTPSURLString from '../../../shared/utils/getHTTPSURLString';
import useBrowserAPIs from '../../../pages/shared/MainContext/useBrowserAPIs';

const AddLink = () => {
  const { redirect } = useBrowserAPIs();
  useDocumentTitle('Add New Link');

  const redirectOnAdded = (shortLinkEntry: ShortLinkEntry) => {
    const link = getHTTPSURLString(shortLinkEntry.shortLink);
    redirect.main.setLink(link).go();
    // hack to close the popup
    setTimeout(() => {
      window.close();
    }, 1000);
  };

  return (
    <>
      <h1>Add Short Link</h1>
      <AddShortLink onLinkAdded={redirectOnAdded} initShortLink="" />
    </>
  );
};

export default AddLink;
