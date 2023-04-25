import { BaseMessage } from '../types';

export type AddLinkMessageRequest = BaseMessage<'addLink', ShortLinkEntry>;
type AddLinkMessageResponse = {
  success: boolean;
};

export const addLinkSendMessage = (shortLinkEntry: ShortLinkEntry): AddLinkMessageRequest => {
  return {
    action: 'addLink',
    data: shortLinkEntry,
  };
};

const AddLinkMessage = (
  api: ShortLinkAPI
): MessageHandler<AddLinkMessageRequest, AddLinkMessageResponse> => {
  return {
    canHandle: (message) => {
      return message.action === 'addLink';
    },
    handle: async (message, sendResponse) => {
      const success = await api.add(message.data);
      console.log({ success, data: message.data });
      sendResponse({ success });
    },
  };
};

export default AddLinkMessage;
