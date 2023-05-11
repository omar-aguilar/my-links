import { LinkExpander } from './types';

const shortLinkExpanderBuilder = (linkExpander: LinkExpander) => {
  let shortLink = '';
  let link = '';
  return {
    setLink(foundLink: string) {
      link = foundLink;
      return this;
    },
    setShortLink(userShortLink: string) {
      shortLink = userShortLink;
      return this;
    },
    build() {
      return linkExpander.build({ shortLink, link });
    },
  };
};

export default shortLinkExpanderBuilder;
