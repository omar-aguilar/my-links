const BrowserTabsWrapper = (): TabsWrapper => {
  return {
    update(tabId, options) {
      browser.tabs.update(tabId, options);
    },
    updateCurrent(options) {
      browser.tabs.update(options);
    },
  };
};

export default BrowserTabsWrapper;
