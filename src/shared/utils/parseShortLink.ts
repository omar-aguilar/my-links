type ParsedShortLink = {
  domain: string;
  slug: string;
  raw: string;
  isValid: boolean;
  params: string[];
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
      raw: `${domain}/${slug}`,
    };
  } catch {
    return { slug: '', domain: '', isValid: false, params: [], raw: shortLink };
  }
};

export default parseShortLink;
