import { getEmptyShortLinkEntry, parseRawShortLink } from '../../../utils';

const ShortLinkMemoryDB = () => {
  const db: Record<string, Record<string, ShortLinkEntry>> = {};

  const addEntry = (shortLink: string, data: ShortLinkEntry): boolean => {
    const { domain, slug } = parseRawShortLink(shortLink);
    if (!db[domain]) {
      db[domain] = {};
    }
    db[domain][slug] = data;
    return true;
  };

  const updateEntry = (shortLink: string, data: ShortLinkEntry): boolean => {
    const { domain, slug } = parseRawShortLink(shortLink);
    if (!db[domain]?.[slug]) {
      return addEntry(shortLink, data);
    }
    db[domain][slug] = data;
    return true;
  };

  const deleteEntry = (shortLink: string): boolean => {
    const { domain, slug } = parseRawShortLink(shortLink);
    delete db[domain]?.[slug];
    return true;
  };

  const getEntry = (shortLink: string): ShortLinkEntry => {
    const { domain, slug } = parseRawShortLink(shortLink);
    const link = db[domain]?.[slug];
    if (!link) {
      return getEmptyShortLinkEntry(shortLink);
    }
    return link;
  };

  const search = (shortLink: string): ShortLinkEntry[] => {
    const { domain, slug } = parseRawShortLink(shortLink);
    if (!db[domain]) {
      return [];
    }
    const cleanSlug = slug.replace(/[-_]/g, '');
    const searchResults = Object.values(db[domain]).filter((entry) => {
      const parsedLink = parseRawShortLink(entry.shortLink);
      const cleanKey = parsedLink.slug.replace(/[-_]/g, '');
      return parsedLink.domain === domain && cleanKey.includes(cleanSlug);
    });
    return searchResults;
  };

  return {
    add: addEntry,
    delete: deleteEntry,
    update: updateEntry,
    get: getEntry,
    search,
  };
};

const LocalMemoryAPI = (): ShortLinkAPI => {
  const db = ShortLinkMemoryDB();

  const resolve: ShortLinkAPI['resolve'] = (shortLink) => {
    const foundLink = db.get(shortLink);
    return Promise.resolve({
      success: true,
      data: foundLink,
    });
  };

  const search: ShortLinkAPI['search'] = (domain, filters) => {
    const shortLink = `${domain}/${filters?.shortLink}`;
    const searchResults = db.search(shortLink);
    return Promise.resolve({
      success: true,
      data: searchResults,
    });
  };

  const add: ShortLinkAPI['add'] = (linkData) => {
    const isAdded = db.add(linkData.shortLink, linkData);
    return Promise.resolve({ success: isAdded });
  };

  const update: ShortLinkAPI['update'] = (linkData) => {
    const isAdded = db.update(linkData.shortLink, linkData);
    return Promise.resolve({ success: isAdded });
  };

  const remove: ShortLinkAPI['remove'] = (shortLink) => {
    const isRemoved = db.delete(shortLink);
    return Promise.resolve({ success: isRemoved });
  };

  return {
    resolve,
    search,
    add,
    update,
    remove,
  };
};

export default LocalMemoryAPI;
