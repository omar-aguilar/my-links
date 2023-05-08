import { useEffect, useState } from 'react';
import { shortLinkMessageCreators } from '../../../background/manager/extension/Message';
import getBrowserAPIs from '../../../background/api/web-extension';
import ShortLinkForm from '../ShortLinkForm';

type UpdateShortLinkProps = {
  initShortLink: string;
  onLinkUpdated?: (shortLinksEntry: ShortLinkEntry) => void;
};

const browserAPIs = getBrowserAPIs();

const UpdateShortLink = ({ initShortLink = '', onLinkUpdated }: UpdateShortLinkProps) => {
  const [shortLinkEntry, setShortLinkEntry] = useState<ShortLinkEntry | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getShortLinkEntry = async () => {
      const { shortLinkEntry: foundShortLinkEntry } = await browserAPIs.runtime.sendMessage(
        shortLinkMessageCreators.get(initShortLink)
      );

      if (!foundShortLinkEntry.link) {
        return;
      }
      setShortLinkEntry(foundShortLinkEntry);
    };
    getShortLinkEntry();
  }, [initShortLink]);

  const updateLink = async (updatedShortLinkEntry: ShortLinkEntry) => {
    const response = await browserAPIs.runtime.sendMessage(
      shortLinkMessageCreators.update(updatedShortLinkEntry)
    );
    if (response.error) {
      setError(response.error);
      return;
    }
    onLinkUpdated?.(updatedShortLinkEntry);
  };

  if (!shortLinkEntry) {
    return <div>Short Link Not Found</div>;
  }

  return (
    <>
      <ShortLinkForm
        title="Update short link"
        buttonLabel="Update Short Link"
        initShortLink={initShortLink}
        defaultValues={shortLinkEntry}
        onAction={updateLink}
      />
      {error && <div>{error}</div>}
    </>
  );
};

export default UpdateShortLink;
