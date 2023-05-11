import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseShortLink } from '@/shared/utils';
import getHTTPSURLString from '@/shared/utils/getHTTPSURLString';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import SearchResults from '../../components/SearchResults';
import AddShortLink from '../../components/AddShortLink';

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

  const { domain, slug, raw: initShortLink } = parseShortLink(shortLink);

  return (
    <>
      <h1>Link not found</h1>
      <AddShortLink onLinkAdded={redirect} initShortLink={initShortLink} />
      <SearchResults domain={domain} shortLink={slug} tag="" title="Maybe you meant" />
    </>
  );
};

export default LinkNotFound;
