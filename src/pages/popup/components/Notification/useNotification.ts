import { useCallback, useEffect, useState } from 'react';
import { NotificationMessage, OnChangeHandler } from './types';
import proxy from './proxy';

const useNotification = () => {
  const notification = useState<NotificationMessage | null>(null);
  const [, setNotification] = notification;

  const onChanged: OnChangeHandler = useCallback(
    (newNotification) => {
      setNotification(newNotification);
    },
    [setNotification]
  );

  useEffect(() => {
    proxy.addListener(onChanged);
    return () => proxy.removeListener(onChanged);
  }, [onChanged]);

  return notification;
};

export default useNotification;
