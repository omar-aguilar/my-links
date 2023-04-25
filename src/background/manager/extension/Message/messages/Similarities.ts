import { BaseMessage } from '../types';

export type SimilaritiesMessageRequest = BaseMessage<
  'similarities',
  {
    shortLink: string;
  }
>;
type SimilaritiesMessageResponse = ShortLinkEntry[];

export const getSimilaritiesSendMessage = (link: string): SimilaritiesMessageRequest => {
  return {
    action: 'similarities',
    data: {
      shortLink: link,
    },
  };
};

const SimilaritiesMessage = (
  api: ShortLinkAPI
): MessageHandler<SimilaritiesMessageRequest, SimilaritiesMessageResponse> => {
  return {
    canHandle: (message) => {
      return message.action === 'similarities';
    },
    handle: async (message, sendResponse) => {
      const similarities = await api.search(message.data.shortLink);
      sendResponse(similarities);
    },
  };
};

export default SimilaritiesMessage;
