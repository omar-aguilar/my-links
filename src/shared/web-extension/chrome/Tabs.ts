const ChromeTabsWrapper = (): TabsWrapper => {
  return {
    update(tabId, options) {
      chrome.tabs.update(tabId, options);
    },
    updateCurrent(options) {
      chrome.tabs.update(options);
    },
  };
};

export default ChromeTabsWrapper;
