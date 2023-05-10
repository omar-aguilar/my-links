type ParsedRawShortLink = {
  domain: string;
  slug: string;
  raw: string;
  isValid: boolean;
};

export const parseRawShortLink = (shortLink: string): ParsedRawShortLink => {
  try {
    const [domain, ...slugParts] = shortLink.split('/');
    const slug = slugParts.join('/');
    return { domain, slug, isValid: true, raw: shortLink };
  } catch {
    return { slug: '', domain: '', isValid: false, raw: shortLink };
  }
};

export const getEmptyShortLinkEntry = (sourceShortLink: string): ShortLinkEntry => {
  return {
    shortLink: sourceShortLink,
    description: '',
    link: '',
    tags: [],
  };
};
