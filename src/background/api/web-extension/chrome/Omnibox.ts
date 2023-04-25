const ChromeOmniboxWrapper = (): OmniboxWrapper => {
  return {
    onInputChanged(callback) {
      chrome.omnibox.onInputChanged.addListener((input, suggest) => {
        callback(input, suggest);
      });
    },
    onInputEntered(callback) {
      chrome.omnibox.onInputEntered.addListener((text) => {
        callback(text);
      });
    },
  };
};

export default ChromeOmniboxWrapper;
