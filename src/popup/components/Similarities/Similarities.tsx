import { useEffect, useState } from 'react';
import { getSimilaritiesSendMessage } from '../../../background/manager/extension/Message/messages';
import getBrowserAPIs from '../../../background/api/web-extension';
import styles from './Similarities.scss';

type SimilartiesProps = {
  shortLink: string;
};

const browserAPIs = getBrowserAPIs();

const Similarities = ({ shortLink }: SimilartiesProps) => {
  const [similarities, setSimilarities] = useState<ShortLinkEntry[]>([]);

  useEffect(() => {
    const getSimilarities = async () => {
      const message = getSimilaritiesSendMessage(shortLink);
      const similaritiesResponse: ShortLinkEntry[] = await browserAPIs.runtime.sendMessage(message);
      setSimilarities(similaritiesResponse);
    };
    if (!shortLink) {
      return;
    }
    getSimilarities();
  }, [shortLink]);

  if (similarities.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>Maybe you meant:</h1>
      <ul>
        {similarities.map((similarity) => {
          return (
            <li key={similarity.shortLink}>
              <h2>
                <a className={styles.link} href={`http://${similarity.shortLink}`}>
                  {similarity.shortLink}
                </a>
              </h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Similarities;
