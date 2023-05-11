import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import UpdateShortLink from '../../components/UpdateShortLink';
import proxy from '../../components/Notification/proxy';

const UpdateLink = () => {
  useDocumentTitle('Update Link');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [shortLink, setShortLink] = useState<string | null>(null);

  useEffect(() => {
    setShortLink(searchParams.get('shortLink'));
  }, [searchParams]);

  if (!shortLink) {
    return null;
  }

  const onLinkUpdated = (shortLinkEntry: ShortLinkEntry) => {
    proxy.setNotification({
      type: 'success',
      message: `Short link ${shortLinkEntry.shortLink} updated successfully`,
    });
    navigate('/');
  };

  return (
    <>
      <h1>Update Short Link</h1>
      <UpdateShortLink onLinkUpdated={onLinkUpdated} initShortLink={shortLink} />
    </>
  );
};

export default UpdateLink;
