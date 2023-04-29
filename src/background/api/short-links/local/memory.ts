import { getEmptyShortLinkEntry, parseRawShortLink } from '../../../utils';

const ShortLinkMemoryDB = () => {
  // TODO: switch to Record<string, Record<string, ShortLinkEntry>>
  // each domain will have its own mini db.
  const db: Record<string, ShortLinkEntry> = {};

  const addEntry = (shortLink: string, data: ShortLinkEntry): boolean => {
    db[shortLink] = data;
    return true;
  };

  const updateEntry = (shortLink: string, data: ShortLinkEntry): boolean => {
    if (!db[shortLink]) {
      return addEntry(shortLink, data);
    }
    db[shortLink] = data;
    return true;
  };

  const deleteEntry = (shortLink: string): boolean => {
    delete db[shortLink];
    return true;
  };

  const getEntry = (shortLink: string): ShortLinkEntry => {
    const link = db[shortLink];
    if (!link) {
      return getEmptyShortLinkEntry(shortLink);
    }
    return link;
  };

  const search = (shortLink: string): ShortLinkEntry[] => {
    const { domain, slug } = parseRawShortLink(shortLink);
    const cleanSlug = slug.replace(/[-_]/g, '');
    const searchResults = Object.values(db).filter((entry) => {
      const parsedLink = parseRawShortLink(entry.shortLink);
      const cleanKey = entry.shortLink.replace(/[-_]/g, '');
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
    return Promise.resolve(foundLink);
  };

  const search: ShortLinkAPI['search'] = (shortLink) => {
    const searchResults = db.search(shortLink);
    return Promise.resolve(searchResults);
  };

  const add: ShortLinkAPI['add'] = (linkData) => {
    const isAdded = db.add(linkData.shortLink, linkData);
    return Promise.resolve(isAdded);
  };

  const update: ShortLinkAPI['update'] = (linkData) => {
    const isAdded = db.update(linkData.shortLink, linkData);
    return Promise.resolve(isAdded);
  };

  const remove: ShortLinkAPI['remove'] = (shortLink) => {
    const isRemoved = db.delete(shortLink);
    return Promise.resolve(isRemoved);
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
