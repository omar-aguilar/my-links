import { EntryMessageHandler, MessageCreatorsMap, MessageHandlersMap } from './types';

type SearchLinkFilters = {
  domain: string;
  shortLink?: string;
  tags?: string[];
  revision?: number;
};

type ShortLinkHandlersMap = {
  create: Message.MessageHandlerConfig<'ShortLink.create', ShortLinkEntry, { success: boolean }>;
  get: Message.MessageHandlerConfig<'ShortLink.get', string, { shortLinkEntry: ShortLinkEntry }>;
  resolve: Message.MessageHandlerConfig<'ShortLink.resolve', string, { link: string }>;
  update: Message.MessageHandlerConfig<'ShortLink.update', ShortLinkEntry, { success: boolean }>;
  delete: Message.MessageHandlerConfig<'ShortLink.delete', string, { success: boolean }>;
  search: Message.MessageHandlerConfig<
    'ShortLink.search',
    SearchLinkFilters,
    { shortLinkEntries: ShortLinkEntry[] }
  >;
};

const createMessageId = 'ShortLink.create';
const getMessageId = 'ShortLink.get';
const resolveMessageId = 'ShortLink.resolve';
const updateMessageId = 'ShortLink.update';
const deleteMessageId = 'ShortLink.delete';
const searchMessageId = 'ShortLink.search';

export const shortLinkMessageCreators: MessageCreatorsMap<ShortLinkHandlersMap> = {
  create(shortLinkEntry) {
    return {
      action: createMessageId,
      data: shortLinkEntry,
    };
  },
  get(shortLink) {
    return {
      action: getMessageId,
      data: shortLink,
    };
  },
  resolve(shortLink) {
    return {
      action: resolveMessageId,
      data: shortLink,
    };
  },
  update(shortLinkEntry) {
    return {
      action: updateMessageId,
      data: shortLinkEntry,
    };
  },
  delete(shortLink) {
    return {
      action: deleteMessageId,
      data: shortLink,
    };
  },
  search(searchFilters) {
    return {
      action: searchMessageId,
      data: searchFilters,
    };
  },
};

const ShortLinkMessageHandler = (api: ShortLinkAPI): EntryMessageHandler => {
  const handlers: MessageHandlersMap<ShortLinkHandlersMap> = {
    async create(message, sendResponse) {
      const response = await api.add(message.data);
      sendResponse(response);
    },
    async get(message, sendResponse) {
      const { data: shortLinkEntry } = await api.get(message.data);
      sendResponse({ shortLinkEntry });
    },
    async resolve(message, sendResponse) {
      const { data: link } = await api.resolve(message.data);
      sendResponse({ link });
    },
    async update(message, sendResponse) {
      const response = await api.update(message.data);
      sendResponse(response);
    },
    async delete(message, sendResponse) {
      const response = await api.remove(message.data);
      sendResponse(response);
    },
    async search(message, sendResponse) {
      const { shortLink, tags, domain } = message.data;
      const { data: shortLinkEntries } = await api.search(domain, { shortLink, tags });
      sendResponse({ shortLinkEntries });
    },
  };

  return [
    [createMessageId, handlers.create],
    [getMessageId, handlers.get],
    [resolveMessageId, handlers.resolve],
    [updateMessageId, handlers.update],
    [deleteMessageId, handlers.delete],
    [searchMessageId, handlers.search],
  ];
};

export default ShortLinkMessageHandler;
