import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import SearchResults from '../../components/SearchResults';
import AddShortLink from '../../components/AddShortLink';
import { getHTTPSURLString } from '../../../background/utils';

const LinkNotFound = () => {
  useDocumentTitle('Link Not Found');
  const [searchParams] = useSearchParams();
  const [shortLink, setShortLink] = useState<string | null>(null);

  useEffect(() => {
    setShortLink(searchParams.get('shortLink'));
  }, [searchParams]);

  if (!shortLink) {
    return null;
  }

  const redirect = (shortLinkEntry: ShortLinkEntry) => {
    window.location.replace(getHTTPSURLString(shortLinkEntry.shortLink));
  };

  return (
    <>
      <h1>Link not found</h1>
      <AddShortLink onLinkAdded={redirect} initShortLink={shortLink} />
      <SearchResults shortLink={shortLink} tag="" title="Maybe you meant" />
    </>
  );
};

export default LinkNotFound;
