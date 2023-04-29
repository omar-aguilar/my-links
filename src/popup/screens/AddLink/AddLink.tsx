import AddShortLink from '../../components/AddShortLink';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { getHTTPSURLString } from '../../../background/utils';

const AddLink = () => {
  useDocumentTitle('Add New Link');

  const redirect = (shortLinkEntry: ShortLinkEntry) => {
    window.location.replace(getHTTPSURLString(shortLinkEntry.shortLink));
  };

  return (
    <>
      <h1>Add Short Link</h1>
      <AddShortLink onLinkAdded={redirect} initShortLink="" />
    </>
  );
};

export default AddLink;
