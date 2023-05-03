import {
  upsertRegisteredDomain,
  getRegisteredDomains,
  getMainDomain,
  deleteRegisteredDomain,
} from '../../../../utils';
import { EntryMessageHandler, MessageCreatorsMap, MessageHandlersMap } from '../types';

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
};

const upsertMessageId = 'Domains.upsert';
const getMessageId = 'Domains.get';
const deleteMessageId = 'Domains.delete';

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
};

const DomainMessageHandler = (): EntryMessageHandler => {
  const handlers: MessageHandlersMap<DomainHandlersMap> = {
    async upsert(message, sendResponse) {
      upsertRegisteredDomain(message.data);
      sendResponse({ success: true });
    },
    async get(_message, sendResponse) {
      const mainDomain = await getMainDomain();
      const registeredDomains = await getRegisteredDomains();
      sendResponse({ mainDomain, registeredDomains });
    },
    async delete(message, sendResponse) {
      deleteRegisteredDomain(message.data);
      sendResponse({ success: true });
    },
  };

  return [
    [upsertMessageId, handlers.upsert],
    [getMessageId, handlers.get],
    [deleteMessageId, handlers.delete],
  ];
};

export default DomainMessageHandler;
