import { useState } from 'react';
import { addLinkSendMessage } from '../../../background/manager/extension/Message/messages';
import getBrowserAPIs from '../../../background/api/web-extension';
import ShortLinkForm from '../ShortLinkForm/ShortLinkForm';

type AddShortLinkProps = {
  initShortLink: string;
  onLinkAdded: (shortLinksEntry: ShortLinkEntry) => void;
};

const browserAPIs = getBrowserAPIs();

const AddShortLink = ({ initShortLink = '', onLinkAdded }: AddShortLinkProps) => {
  const [error, setError] = useState('');

  const addLink = async (shortLinkEntry: ShortLinkEntry) => {
    const message = addLinkSendMessage(shortLinkEntry);
    const response = await browserAPIs.runtime.sendMessage(message);
    if (response.error) {
      setError(response.error);
      return;
    }
    onLinkAdded(shortLinkEntry);
  };

  return (
    <>
      <ShortLinkForm
        buttonLabel="Create Short Link"
        initShortLink={initShortLink}
        onAction={addLink}
      />
      {error && <div>{error}</div>}
    </>
  );
};

export default AddShortLink;
