import { useEffect } from 'react';
import InfoIcon from '../../icons/Info';
import SuccessIcon from '../../icons/CheckCircle';
import ErrorIcon from '../../icons/XCircle';
import useNotification from './useNotification';

const icons = {
  info: InfoIcon,
  success: SuccessIcon,
  error: ErrorIcon,
};

const Colors = {
  info: {
    border: 'border-blue-500',
    bg: 'bg-blue-100',
    text: 'text-blue-900',
    icon: 'fill-blue-500',
  },
  success: {
    border: 'border-teal-500',
    bg: 'bg-teal-100',
    text: 'text-teal-900',
    icon: 'fill-teal-500',
  },
  error: {
    border: 'border-red-500',
    bg: 'bg-red-100',
    text: 'text-red-900',
    icon: 'fill-red-500',
  },
};

const Notification = () => {
  const [notification, setNotification] = useNotification();

  useEffect(() => {
    const clearNotification = (notificationTimeout: number) => {
      return setTimeout(() => {
        setNotification(null);
      }, notificationTimeout);
    };

    if (!notification) {
      return undefined;
    }

    const notificationTimeout = notification.timeout || 5000;
    const timerId = clearNotification(notificationTimeout);
    return () => clearTimeout(timerId);
  }, [notification, setNotification]);

  const { type, message } = notification || {};

  if (!type || !message) {
    return null;
  }

  const Icon = icons[type];
  const colors = Colors[type];

  return (
    <div
      className={`ml-2 mb-2 max-w-sm flex self-start px-3 py-2 text-sm leading-none font-medium
       ${colors.bg} border ${colors.border} rounded-xl whitespace-no-wrap`}
    >
      <Icon className={colors.icon} />
      <div className={`ml-1 inline-flex items-center ${colors.text}`}>{message}</div>
    </div>
  );
};

export default Notification;
