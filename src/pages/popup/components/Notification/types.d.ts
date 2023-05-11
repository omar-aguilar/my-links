export type NotificationMessage = {
  message: string;
  type: 'info' | 'success' | 'error';
  timeout?: number;
};

export type OnChangeHandler = (notification: NotificationMessage) => void;
