import { useEffect, useState } from 'react';
import { getSimilaritiesSendMessage } from '../../../background/manager/extension/Message/messages';
import getBrowserAPIs from '../../../background/api/web-extension';

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
      <h2>Maybe you meant:</h2>
      <ul className="grid grid-cols-4 gap-2">
        {similarities.map((shortLinkEntry) => {
          return (
            <li
              key={shortLinkEntry.shortLink}
              className="border py-2 px-4 rounded bg-gray-50 flex justify-center flex-col"
            >
              <a
                className="text-violet-500 text-sm font-bold"
                href={`https://${shortLinkEntry.shortLink}`}
              >
                {shortLinkEntry.shortLink}
              </a>
              {shortLinkEntry.description && <div>{shortLinkEntry.description}</div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Similarities;
