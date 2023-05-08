import { NotificationMessage, OnChangeHandler } from './types';

const NotificationProxy = () => {
  let onChangeListeners: OnChangeHandler[] = [];

  const proxy = new Proxy(
    { content: {} as NotificationMessage },
    {
      set(target, prop, value, receiver) {
        const result = Reflect.set(target, prop, value, receiver);
        onChangeListeners.forEach((listener) => listener(target.content));
        return result;
      },
    }
  );

  const addListener = (listener: OnChangeHandler) => {
    onChangeListeners.push(listener);
  };

  const removeListener = (listener: OnChangeHandler) => {
    onChangeListeners = onChangeListeners.filter((l) => l !== listener);
  };

  const setNotification = (notification: NotificationMessage) => {
    proxy.content = notification;
  };

  return {
    addListener,
    removeListener,
    setNotification,
  };
};

const proxy = NotificationProxy();

export default proxy;
