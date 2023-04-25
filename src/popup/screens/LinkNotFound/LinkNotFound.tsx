import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Similarities from '../../components/Similarities';
import AddLink from '../../components/AddLink/AddLink';
import styles from './LinkNotFound.scss';

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

  return (
    <>
      <h1>
        <span>Link not found </span>
        <span className={styles['link-not-found']}>{shortLink}</span>
      </h1>
      <AddLink onLinkAdded={console.log} initShortLink={shortLink} />
      <Similarities shortLink={shortLink} />
    </>
  );
};

export default LinkNotFound;
