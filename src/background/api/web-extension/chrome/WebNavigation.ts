const ChromeWebNavigationWrapper =
  (): WebNavigationWrapper<chrome.webNavigation.WebNavigationEventFilter> => {
    return {
      onBeforeNavigate(callback, filters) {
        chrome.webNavigation.onBeforeNavigate.addListener((details) => {
          const { frameId } = details;
          const isMainFrame = frameId === 0;
          if (!isMainFrame) {
            return;
          }
          callback(details);
        }, filters);
      },
    };
  };

export default ChromeWebNavigationWrapper;
