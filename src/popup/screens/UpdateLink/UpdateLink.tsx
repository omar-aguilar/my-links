import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import UpdateShortLink from '../../components/UpdateShortLink';

const UpdateLink = () => {
  useDocumentTitle('Update Link');
  const [searchParams] = useSearchParams();
  const [shortLink, setShortLink] = useState<string | null>(null);

  useEffect(() => {
    setShortLink(searchParams.get('shortLink'));
  }, [searchParams]);

  if (!shortLink) {
    return null;
  }

  return (
    <>
      <h1>Update Short Link</h1>
      <UpdateShortLink onLinkUpdated={console.log} initShortLink={shortLink} />
    </>
  );
};

export default UpdateLink;
