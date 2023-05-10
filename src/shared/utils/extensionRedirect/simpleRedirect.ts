import { Redirect } from './types';

const simpleRedirect = (): Redirect => {
  let link = '';
  let fallback = '';

  return {
    setLink(url: string) {
      link = url;
    },
    setFallback(url: string) {
      fallback = url;
    },
    get link() {
      return link;
    },
    get fallback() {
      return fallback;
    },
  };
};

export default simpleRedirect;
