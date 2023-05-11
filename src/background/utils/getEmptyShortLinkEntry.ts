const getEmptyShortLinkEntry = (sourceShortLink: string): ShortLinkEntry => {
  return {
    shortLink: sourceShortLink,
    description: '',
    link: '',
    tags: [],
  };
};

export default getEmptyShortLinkEntry;
