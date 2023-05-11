type ParsedShortLink = {
  domain: string;
  slug: string;
  base: string;
  isValid: boolean;
  params: string[];
  raw: string;
};

const parseShortLink = (shortLink: string): ParsedShortLink => {
  try {
    const [domain, slug, ...params] = shortLink.split('/');
    const cleanParams = params.filter(Boolean);
    return {
      domain,
      slug,
      params: cleanParams,
      isValid: true,
      base: `${domain}/${slug}`,
      raw: shortLink,
    };
  } catch {
    return { slug: '', domain: '', isValid: false, params: [], base: '', raw: shortLink };
  }
};

export default parseShortLink;
