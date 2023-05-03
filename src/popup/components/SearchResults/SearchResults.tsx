import { useEffect, useState } from 'react';
import { shortLinkMessageCreators } from '../../../background/manager/extension/Message';
import getBrowserAPIs from '../../../background/api/web-extension';
import ShortLinkEntry from './ShortLinkEntry';

type SearchResultsProps = {
  title: string;
  shortLink: string;
  tag: string;
  showAdmin?: boolean;
};

const browserAPIs = getBrowserAPIs();

const SearchResults = ({ title, shortLink, tag, showAdmin = false }: SearchResultsProps) => {
  const [searchResults, setSearchResults] = useState<ShortLinkEntry[]>([]);

  useEffect(() => {
    const getSearchResults = async () => {
      const response = await browserAPIs.runtime.sendMessage(
        shortLinkMessageCreators.search({ shortLink })
      );
      setSearchResults(response.shortLinkEntries);
    };

    const getSearchByTagResults = async () => {
      const response = await browserAPIs.runtime.sendMessage(
        shortLinkMessageCreators.search({ tags: [tag] })
      );
      setSearchResults(response.shortLinkEntries);
    };
    if (!shortLink && !tag) {
      return;
    }
    if (tag) {
      getSearchByTagResults();
      return;
    }
    getSearchResults();
  }, [shortLink, tag]);

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>{title}</h2>
      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2">
        {searchResults.map((shortLinkEntry) => {
          return (
            <li key={shortLinkEntry.shortLink}>
              <ShortLinkEntry entry={shortLinkEntry} showAdmin={showAdmin} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResults;