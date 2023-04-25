const Message = (browserAPIs: BrowserAPIs) => {
  const handlers: MessageHandler[] = [];
  browserAPIs.runtime.onMessage((message, sendResponse) => {
    const handler = handlers.find((currentHandler) => currentHandler.canHandle(message));
    if (!handler) {
      return;
    }
    handler.handle(message, sendResponse);
  });

  const register = (messageHandler: MessageHandler) => {
    handlers.push(messageHandler);
  };

  return { register };
};

export default Message;
