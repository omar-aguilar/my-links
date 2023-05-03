import { useCallback, useState } from 'react';
import { TextInputWithDomainSelector } from '../TextField';
import SearchResults from '../SearchResults';
import TextField from '../TextField/TextField';

const debounce = (fn: any, delay: number) => {
  let timerId: any;
  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const DEBOUNCE_DELAY = 300;

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchTagValue, setSearchTagValue] = useState('');

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
    <>
      <TextField
        label="Search"
        value=""
        onChange={handleOnSearchChange}
        Input={TextInputWithDomainSelector}
      />
      <TextField label="Search By Tag" value="" onChange={handleOnTagsChange} />
      <SearchResults shortLink={searchValue} tag={searchTagValue} showAdmin title="Results" />
    </>
  );
};

export default Search;
