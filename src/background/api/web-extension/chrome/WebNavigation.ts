const ChromeWebNavigationWrapper =
  (): WebNavigationWrapper<chrome.webNavigation.WebNavigationEventFilter> => {
    return {
      onBeforeNavigate(callback, filters) {
        const handleBeforeNavigate = (
          details: chrome.webNavigation.WebNavigationParentedCallbackDetails
        ) => {
          const { frameId } = details;
          const isMainFrame = frameId === 0;
          if (!isMainFrame) {
            return;
          }
          callback(details);
        };
        chrome.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, filters);
        return () => {
          chrome.webNavigation.onBeforeNavigate.removeListener(handleBeforeNavigate);
        };
      },
    };
  };

export default ChromeWebNavigationWrapper;
