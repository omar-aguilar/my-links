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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const triggerSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, DEBOUNCE_DELAY),
    [setSearchValue]
  );

  const handleOnChange = (newValue: string) => {
    triggerSearch(newValue);
  };

  return (
    <>
      <TextField
        label="Search"
        value=""
        onChange={handleOnChange}
        Input={TextInputWithDomainSelector}
      />
      <SearchResults shortLink={searchValue} showAdmin title="Results" />
    </>
  );
};

export default Search;
