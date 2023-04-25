import { useState } from 'react';
import { addLinkSendMessage } from '../../../background/manager/extension/Message/messages';
import getBrowserAPIs from '../../../background/api/web-extension';
import styles from './AddLink.scss';
import TagList from '../TagList';

type AddLinkProps = {
  initShortLink: string;
  onLinkAdded: () => void;
};

const browserAPIs = getBrowserAPIs();

const AddLink = ({ onLinkAdded, initShortLink = '' }: AddLinkProps) => {
  const [shortLink, setShortLink] = useState(initShortLink);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  const addLink = async () => {
    const shortLinkEntry: ShortLinkEntry = {
      shortLink,
      description,
      tags,
      link,
    };
    const message = addLinkSendMessage(shortLinkEntry);
    const response = await browserAPIs.runtime.sendMessage(message);
    if (response.error) {
      setError(response.error);
      return;
    }
    onLinkAdded();
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Short Link"
        value={shortLink}
        onChange={(e) => setShortLink(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TagList initStrings={tags} onStringsChanged={(newTags) => setTags(newTags)} />
      <button type="button" className={styles.button} onClick={addLink}>
        Add
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default AddLink;
