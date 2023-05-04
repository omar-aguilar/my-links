const BrowserWebNavigationWrapper =
  (): WebNavigationWrapper<browser.webNavigation.EventUrlFilters> => {
    return {
      onBeforeNavigate(callback, filters) {
        const handleBeforeNavigate = (details: browser.webNavigation._OnBeforeNavigateDetails) => {
          const { frameId } = details;
          const isMainFrame = frameId === 0;
          if (!isMainFrame) {
            return;
          }
          callback(details);
        };
        browser.webNavigation.onBeforeNavigate.addListener(handleBeforeNavigate, filters);
        return () => {
          browser.webNavigation.onBeforeNavigate.removeListener(handleBeforeNavigate);
        };
      },
    };
  };

export default BrowserWebNavigationWrapper;
