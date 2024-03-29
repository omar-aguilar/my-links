import { useEffect, useState } from 'react';
import useBrowserAPIs from '@/pages/_shared/MainContext/useBrowserAPIs';
import { shortLinkMessageCreators } from '@/shared/messages';
import ShortLinkForm from '../ShortLinkForm';

type UpdateShortLinkProps = {
  initShortLink: string;
  onLinkUpdated?: (shortLinksEntry: ShortLinkEntry) => void;
};

const UpdateShortLink = ({ initShortLink = '', onLinkUpdated }: UpdateShortLinkProps) => {
  const { sendMessage } = useBrowserAPIs();
  const [shortLinkEntry, setShortLinkEntry] = useState<ShortLinkEntry | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getShortLinkEntry = async () => {
      const { shortLinkEntry: foundShortLinkEntry } = await sendMessage(
        shortLinkMessageCreators.get(initShortLink)
      );

      if (!foundShortLinkEntry.link) {
        return;
      }
      setShortLinkEntry(foundShortLinkEntry);
    };
    getShortLinkEntry();
  }, [initShortLink, sendMessage]);

  const updateLink = async (updatedShortLinkEntry: ShortLinkEntry) => {
    const response = await sendMessage(shortLinkMessageCreators.update(updatedShortLinkEntry));
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
