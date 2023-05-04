const BrowserRuntimeWrapper = (): RuntimeWrapper => {
  return {
    onMessage(callback) {
      browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
        const isMessageFromSameExtension = sender.id === browser.runtime.id;
        if (!isMessageFromSameExtension) {
          return false;
        }
        callback(message, sendResponse);
        return true;
      });
    },
    getURL(path) {
      return browser.runtime.getURL(path);
    },
    sendMessage(message) {
      return browser.runtime.sendMessage(message);
    },
  };
};

export default BrowserRuntimeWrapper;
