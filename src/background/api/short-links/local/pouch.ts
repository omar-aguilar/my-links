import PouchDB from 'pouchdb-browser';
import PouchFindPlugin from 'pouchdb-find';
import { getEmptyShortLinkEntry, parseRawShortLink } from '../../../utils';

PouchDB.plugin(PouchFindPlugin);
const db = new PouchDB<ShortLinkEntry>('short-links');

db.createIndex({
  index: {
    fields: ['$domain', 'tags'],
    name: 'short-links-tags',
  },
});

const PouchDBAPI = (): ShortLinkAPI => {
  const searchByTags = async (domain: string, tag: string): Promise<ShortLinkEntry[]> => {
    const entries = await db.find({
      selector: {
        $and: [
          {
            tags: {
              $elemMatch: {
                $eq: tag,
              },
            },
          },
          {
            $domain: {
              $eq: domain,
            },
          },
        ],
      },
    });
    return entries.docs;
  };

  const searchByLinks = async (domain: string, link: string): Promise<ShortLinkEntry[]> => {
    const searchLink = `${domain}/${link}`;
    const entries = await db.allDocs<ShortLinkEntry>({
      include_docs: true,
      startkey: searchLink,
      endkey: `${searchLink}\ufff0`,
      limit: 25,
    });
    return entries.rows.map((row) => row.doc as ShortLinkEntry);
  };

  const search: ShortLinkAPI['search'] = async (domain, filters) => {
    const { shortLink = '', tags } = filters || {};
    if (tags?.length) {
      const data = await searchByTags(domain, tags[0]);
      return { success: true, data };
    }
    const data = await searchByLinks(domain, shortLink);
    return { success: true, data };
  };

  const add: ShortLinkAPI['add'] = async (linkData) => {
    const { domain } = parseRawShortLink(linkData.shortLink);
    try {
      await db.put({
        _id: linkData.shortLink,
        $domain: domain,
        ...linkData,
      });
      return {
        success: true,
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          success: false,
          error: e.message,
        };
      }
      throw e;
    }
  };

  const resolve: ShortLinkAPI['resolve'] = async (shortLink) => {
    try {
      const foundLink = await db.get(shortLink);
      return {
        success: true,
        data: foundLink,
      };
    } catch (e) {
      return {
        success: true,
        data: getEmptyShortLinkEntry(shortLink),
      };
    }
  };

  const update: ShortLinkAPI['update'] = async (linkData) => {
    try {
      const result = await db.get(linkData.shortLink);
      await db.put({
        ...result,
        ...linkData,
      });
      return { success: true };
    } catch (e) {
      if (e instanceof Error) {
        return { success: false, error: e.message };
      }
      throw e;
    }
  };

  const remove: ShortLinkAPI['remove'] = async (shortLink) => {
    try {
      const doc = await db.get(shortLink);
      await db.remove(doc);
      return { success: true };
    } catch (e) {
      if (e instanceof Error) {
        return { success: false, error: e.message };
      }
      throw e;
    }
  };

  return {
    resolve,
    search,
    add,
    update,
    remove,
  };
};

export default PouchDBAPI;
