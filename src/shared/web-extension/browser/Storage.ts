const BrowserLocalStorageWrapper = (): StorageWrapper => {
  return {
    onChanged(keys, callback) {
      const handleOnChanged = (
        changes: { [key: string]: browser.storage.StorageChange },
        areaName: string
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

      browser.storage.onChanged.addListener(handleOnChanged);
      return () => {
        browser.storage.onChanged.removeListener(handleOnChanged);
      };
    },
    set(values) {
      return browser.storage.local.set(values);
    },
    get(keys) {
      return browser.storage.local.get(keys);
    },
  };
};

export default BrowserLocalStorageWrapper;
