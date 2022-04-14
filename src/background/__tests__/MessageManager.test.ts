import MessageManager from '../MessageManager';
import { DBMock } from './common.mock';

describe('MessageManager', () => {
  const messageManager = MessageManager(DBMock);
  it('does nothing on invalid message', () => {
    const sendResponseMock = jest.fn();
    const invalidMessage = {};
    messageManager.onMessage(invalidMessage, undefined as never, sendResponseMock);
    expect(sendResponseMock).not.toHaveBeenCalled();
  });

  it('does nothing on valid message but no valid action', () => {
    const sendResponseMock = jest.fn();
    const messageWithInvalidAction = {
      action: 'invalid-action',
      data: {
        rawLink: 'o/link',
      },
    };
    messageManager.onMessage(messageWithInvalidAction, undefined as never, sendResponseMock);
    expect(sendResponseMock).not.toHaveBeenCalled();
  });

  describe('valid messages', () => {
    it('sends back similarities on similarities message', (done) => {
      const mockRawLink = 'o/link';
      const mockSimilarities = [
        {
          link: {
            rawLink: mockRawLink,
          },
        },
      ] as Similarity[];
      jest
        .spyOn(DBMock, 'getSimilarities')
        .mockImplementationOnce(() => Promise.resolve(mockSimilarities));
      const sendResponseMock = jest.fn();
      const messageWithInvalidAction = {
        action: 'similarities',
        data: {
          rawLink: mockRawLink,
        },
      };
      messageManager.onMessage(messageWithInvalidAction, undefined as never, sendResponseMock);
      setImmediate(() => {
        expect(sendResponseMock).toHaveBeenCalledTimes(1);
        expect(sendResponseMock).toHaveBeenCalledWith(mockSimilarities);
        done();
      });
    });
  });
});
