import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import styles from './LinkNotFound.scss';

const LinkNotFound: FunctionComponent = () => {
  useDocumentTitle('My Links - Link Not Found');
  const [searchParams] = useSearchParams();
  const [link, setLink] = useState('');
  const [similarities, setSimilarities] = useState<Link[]>([]);
  useEffect(() => {
    setLink(searchParams.get('link') || '');
  }, [searchParams]);

  useEffect(() => {
    if (!link) {
      return;
    }
    const message: MessageManager.Message = {
      action: 'similarities',
      data: { rawLink: link },
    };
    chrome.runtime.sendMessage(message, (similaritiesResponse: Similarity[]) => {
      const linkSimilarities = similaritiesResponse.map((similarity) => similarity.link);
      setSimilarities(linkSimilarities);
    });
  }, [link]);

  return (
    <>
      <h1>
        <span>Link not found </span>
        <span className={styles.link}>{link}</span>
      </h1>
      {similarities.length > 0 && (
        <div>
          <h1>Maybe you meant:</h1>
          <ul>
            {similarities.map((similarity) => {
              return (
                <li key={similarity.rawLink}>
                  <h2>
                    <a className={styles.link} href={`http://${similarity.rawLink}`}>
                      {similarity.rawLink}
                    </a>
                  </h2>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default LinkNotFound;
