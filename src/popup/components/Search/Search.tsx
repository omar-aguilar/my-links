import { useCallback, useState } from 'react';
import SearchResults from '../SearchResults';
import TextField from '../TextField/TextField';
import DomainDropdown from '../DomainDropdown';
import debounce from './debounce';

const DEBOUNCE_DELAY = 300;

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchTagValue, setSearchTagValue] = useState('');
  const [domain, setDomain] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const triggerSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, DEBOUNCE_DELAY),
    [setSearchValue]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const triggerTagSearch = useCallback(
    debounce((value: string) => {
      setSearchTagValue(value);
    }, DEBOUNCE_DELAY),
    [setSearchTagValue]
  );

  const handleOnSearchChange = (newValue: string) => {
    setSearchTagValue('');
    triggerSearch(newValue);
  };

  const handleOnTagsChange = (newValue: string) => {
    setSearchValue('');
    triggerTagSearch(newValue);
  };

  return (
    <div className="my-2 p-2 rounded shadow-md rounded border border-gray-400">
      <h2 className="font-bold mb-2">Search</h2>
      <DomainDropdown onChange={setDomain} />
      <TextField label="Short Link" value="" onChange={handleOnSearchChange} />
      <TextField label="Tag" value="" onChange={handleOnTagsChange} />
      <SearchResults
        shortLink={searchValue}
        tag={searchTagValue}
        domain={domain}
        showAdmin
        title="Results"
      />
    </div>
  );
};

export default Search;
