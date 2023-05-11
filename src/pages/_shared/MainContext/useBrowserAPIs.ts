import { useContext } from 'react';
import { Context } from './MainContext';

const useBrowserAPIs = () => {
  const context = useContext(Context);
  return context;
};

export default useBrowserAPIs;
