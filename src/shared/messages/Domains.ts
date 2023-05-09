import { EntryMessageHandler, MessageCreatorsMap, MessageHandlersMap } from './types';

type DomainFilters = {
  prefix?: string;
};

type DomainHandlersMap = {
  upsert: Message.MessageHandlerConfig<'Domains.upsert', DomainEntry, { success: boolean }>;
  get: Message.MessageHandlerConfig<
    'Domains.get',
    undefined,
    {
      mainDomain: string;
      registeredDomains: DomainEntry[];
    }
  >;
  delete: Message.MessageHandlerConfig<'Domains.delete', string, { success: boolean }>;
  search: Message.MessageHandlerConfig<
    'Domains.search',
    DomainFilters,
    { domainEntries: DomainEntry[] }
  >;
};

const upsertMessageId = 'Domains.upsert';
const getMessageId = 'Domains.get';
const deleteMessageId = 'Domains.delete';
const searchMessageId = 'Domains.search';

export const domainMessageCreators: MessageCreatorsMap<DomainHandlersMap> = {
  upsert(domainEntry) {
    return {
      action: upsertMessageId,
      data: domainEntry,
    };
  },
  get() {
    return {
      action: getMessageId,
      data: undefined,
    };
  },
  delete(domain) {
    return {
      action: deleteMessageId,
      data: domain,
    };
  },
  search(domain) {
    return {
      action: searchMessageId,
      data: domain,
    };
  },
};

const DomainMessageHandler = (api: DomainsAPI): EntryMessageHandler => {
  const handlers: MessageHandlersMap<DomainHandlersMap> = {
    async upsert(message, sendResponse) {
      const { success } = await api.upsert(message.data);
      sendResponse({ success });
    },
    async get(_message, sendResponse) {
      const { data: mainDomain } = await api.getMainDomain();
      const { data: registeredDomains } = await api.search();
      sendResponse({ mainDomain, registeredDomains });
    },
    async delete(message, sendResponse) {
      const { success } = await api.remove(message.data);
      sendResponse({ success });
    },
    async search(message, sendResponse) {
      const { data: domainEntries } = await api.search(message.data);
      sendResponse({ domainEntries });
    },
  };

  return [
    [upsertMessageId, handlers.upsert],
    [getMessageId, handlers.get],
    [deleteMessageId, handlers.delete],
    [searchMessageId, handlers.search],
  ];
};

export default DomainMessageHandler;
