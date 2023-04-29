const Message = (browserAPIs: BrowserAPIs) => {
  const handlers: Record<string, MessageHandler> = {};
  browserAPIs.runtime.onMessage((message, sendResponse) => {
    const handler = handlers[message.action];
    handler?.(message, sendResponse);
  });

  const register = (id: string, messageHandler: MessageHandler) => {
    handlers[id] = messageHandler;
  };

  return { register };
};

export default Message;
