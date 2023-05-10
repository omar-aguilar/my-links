import { useState } from 'react';
import { shortLinkMessageCreators } from '../../../shared/messages';
import ShortLinkForm from '../ShortLinkForm';
import useBrowserAPIs from '../../../pages/shared/MainContext/useBrowserAPIs';

type AddShortLinkProps = {
  initShortLink: string;
  onLinkAdded?: (shortLinksEntry: ShortLinkEntry) => void;
};

const AddShortLink = ({ initShortLink = '', onLinkAdded }: AddShortLinkProps) => {
  const { sendMessage } = useBrowserAPIs();
  const [error, setError] = useState('');

  const addLink = async (shortLinkEntry: ShortLinkEntry) => {
    const response = await sendMessage(shortLinkMessageCreators.create(shortLinkEntry));
    if (response.error) {
      setError(response.error);
      return;
    }
    onLinkAdded?.(shortLinkEntry);
  };

  return (
    <>
      <ShortLinkForm
        title="Create new short link"
        buttonLabel="Create Short Link"
        initShortLink={initShortLink}
        onAction={addLink}
      />
      {error && <div>{error}</div>}
    </>
  );
};

export default AddShortLink;
