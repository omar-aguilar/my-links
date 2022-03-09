import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import styles from './LinkNotFound.scss';

const LinkNotFound: FunctionComponent = () => {
  useDocumentTitle('My Links - Link Not Found');
  const [searchParams] = useSearchParams();
  const [link, setLink] = useState('');
  const [similarities, setSimilarities] = useState<string[]>([]);
  useEffect(() => {
    setLink(searchParams.get('link') || '');
  }, [searchParams]);

  useEffect(() => {
    if (!link) {
      return;
    }
    const message: Message = {
      action: 'similarities',
      data: { link, tolerance: 3 },
    };
    chrome.runtime.sendMessage(message, (linkSimilarities: string[]) => {
      setSimilarities(linkSimilarities);
    });
  }, [link]);

  return (
    <>
      <h1>
        <span>Link not found </span>
        <span className={styles.link}>{link}</span>
      </h1>
      <div>
        <h1>Maybe you meant:</h1>
        <ul>
          {similarities.map((similarity) => {
            return (
              <li key={similarity}>
                <h2>
                  <a className={styles.link} href={`http://${similarity}`}>
                    {similarity}
                  </a>
                </h2>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default LinkNotFound;
