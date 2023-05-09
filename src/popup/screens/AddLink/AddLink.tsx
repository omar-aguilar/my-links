import AddShortLink from '../../components/AddShortLink';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { getHTTPSURLString } from '../../../background/utils';
import useBrowserAPIs from '../../../pages/common/MainContext/useBrowserAPIs';

const AddLink = () => {
  const browserAPIs = useBrowserAPIs();
  useDocumentTitle('Add New Link');

  const redirect = (shortLinkEntry: ShortLinkEntry) => {
    browserAPIs.tabs.updateCurrent({ url: getHTTPSURLString(shortLinkEntry.shortLink) });
    // hack to close the popup
    setTimeout(() => {
      window.close();
    }, 1000);
  };

  return (
    <>
      <h1>Add Short Link</h1>
      <AddShortLink onLinkAdded={redirect} initShortLink="" />
    </>
  );
};

export default AddLink;
