import { useContext } from 'react';
import { Context } from './MainContext';

const useBrowserAPIs = () => {
  const { browserAPIs } = useContext(Context);
  return browserAPIs;
};

export default useBrowserAPIs;
