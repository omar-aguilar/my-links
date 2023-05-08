import { useState } from 'react';
import { shortLinkMessageCreators } from '../../../background/manager/extension/Message';
import getBrowserAPIs from '../../../background/api/web-extension';
import ShortLinkForm from '../ShortLinkForm';

type AddShortLinkProps = {
  initShortLink: string;
  onLinkAdded: (shortLinksEntry: ShortLinkEntry) => void;
};

const browserAPIs = getBrowserAPIs();

const AddShortLink = ({ initShortLink = '', onLinkAdded }: AddShortLinkProps) => {
  const [error, setError] = useState('');

  const addLink = async (shortLinkEntry: ShortLinkEntry) => {
    const response = await browserAPIs.runtime.sendMessage(
      shortLinkMessageCreators.create(shortLinkEntry)
    );
    if (response.error) {
      setError(response.error);
      return;
    }
    onLinkAdded(shortLinkEntry);
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
