/* eslint-disable no-underscore-dangle */
import PouchDB from 'pouchdb-browser';
import PouchFindPlugin from 'pouchdb-find';
import { getEmptyShortLinkEntry } from '../../../utils';

PouchDB.plugin(PouchFindPlugin);
const db = new PouchDB<ShortLinkEntry>('short-links');
(globalThis as any).db = db;
db.createIndex({
  index: {
    fields: ['tags'],
    name: 'short-links-tags',
  },
});

const PouchDBAPI = (): ShortLinkAPI => {
  const searchByTags = async (tag: string): Promise<ShortLinkEntry[]> => {
    const entries = await db.find({
      selector: {
        tags: {
          $elemMatch: {
            $eq: tag,
          },
        },
      },
      use_index: 'short-links-tags',
    });

    return entries.docs;
  };

  const searchByLinks = async (link: string): Promise<ShortLinkEntry[]> => {
    const entries = await db.allDocs<ShortLinkEntry>({
      include_docs: true,
      startkey: link,
      endkey: `${link}\ufff0`,
    });
    return entries.rows.map((row) => row.doc as ShortLinkEntry);
  };

  const search: ShortLinkAPI['search'] = async (shortLink, filters) => {
    if (filters?.tag) {
      const data = await searchByTags(filters.tag);
      return { success: true, data };
    }
    const data = await searchByLinks(shortLink);
    return { success: true, data };
  };

  const add: ShortLinkAPI['add'] = async (linkData) => {
    try {
      await db.put({
        _id: linkData.shortLink,
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
