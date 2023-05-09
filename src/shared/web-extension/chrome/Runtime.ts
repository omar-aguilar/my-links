const ChromeRuntimeWrapper = (): RuntimeWrapper => {
  return {
    onMessage(callback) {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        const isMessageFromSameExtension = sender.id === chrome.runtime.id;
        if (!isMessageFromSameExtension) {
          return false;
        }
        callback(message, sendResponse);
        return true;
      });
    },
    getURL(path) {
      return chrome.runtime.getURL(path);
    },
    sendMessage(message) {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage(message, resolve);
      });
    },
  };
};

export default ChromeRuntimeWrapper;
