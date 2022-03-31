import Link from '../LinkManager/Link';

function MessageManager(db: DB): ChromeMessageManager {
  const onMessage: ChromeMessageManager.OnMessage = (message, _, sendResponse) => {
    const { action, data } = message as MessageManager.Message;
    if (!action && !data) {
      return false;
    }
    if (action === 'similarities' && data.rawLink) {
      const link = new Link(data.rawLink);
      db.getSimilarities(link).then((similarities) => {
        console.log('similarities', similarities);
        sendResponse(similarities);
      });
    }
    return true;
  };

  return { onMessage };
}

export default MessageManager;
