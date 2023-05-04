const BrowserOmniboxWrapper = (): OmniboxWrapper => {
  return {
    onInputChanged(callback) {
      browser.omnibox.onInputChanged.addListener((input, suggest) => {
        callback(input, suggest);
      });
    },
    onInputEntered(callback) {
      browser.omnibox.onInputEntered.addListener((text) => {
        callback(text);
      });
    },
  };
};

export default BrowserOmniboxWrapper;
