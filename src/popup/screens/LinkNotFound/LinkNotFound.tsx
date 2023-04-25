import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Similarities from '../../components/Similarities';
import AddShortLink from '../../components/AddShortLink';

const LinkNotFound: FunctionComponent = () => {
  useDocumentTitle('My Links - Link Not Found');
  const [searchParams] = useSearchParams();
  const [shortLink, setShortLink] = useState<string | null>(null);

  useEffect(() => {
    setShortLink(searchParams.get('shortLink'));
  }, [searchParams]);

  if (!shortLink) {
    return null;
  }

  const redirect = (shortLinkEntry: ShortLinkEntry) => {
    window.location.replace(`https://${shortLinkEntry.shortLink}`);
  };

  return (
    <>
      <h1>Link not found</h1>
      <AddShortLink onLinkAdded={redirect} initShortLink={shortLink} />
      <Similarities shortLink={shortLink} />
    </>
  );
};

export default LinkNotFound;
