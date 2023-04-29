const ChromeLocalStorageWrapper = (): StorageWrapper => {
  return {
    onChanged(keys, callback) {
      const handleOnChanged = (
        changes: { [key: string]: chrome.storage.StorageChange },
        areaName: chrome.storage.AreaName
      ) => {
        const isLocalAreaName = areaName === 'local';
        const changedKeys = new Set(Object.keys(changes));
        const keysWithChanges = keys.filter((key) => changedKeys.has(key));
        const containsValidKeys = keysWithChanges.length > 0;
        if (!isLocalAreaName || !containsValidKeys) {
          return;
        }
        const realChanges = keysWithChanges.reduce((results, key) => {
          // eslint-disable-next-line no-param-reassign
          results[key] = changes[key].newValue;
          return results;
        }, {} as StorageWrapper.Changes);
        callback(realChanges);
      };

      chrome.storage.onChanged.addListener(handleOnChanged);
      return () => {
        chrome.storage.onChanged.removeListener(handleOnChanged);
      };
    },
    set(values) {
      return chrome.storage.local.set(values);
    },
    get(keys) {
      return chrome.storage.local.get(keys);
    },
  };
};

export default ChromeLocalStorageWrapper;
