import { useState } from 'react';
import styles from './TagList.scss';

type TagListProps = {
  initStrings: string[];
  onStringsChanged: (strings: string[]) => void;
};

const TagList = ({ initStrings = [], onStringsChanged }: TagListProps) => {
  const [strings, setStrings] = useState(initStrings);
  const [newString, setNewString] = useState('');

  const addString = () => {
    if (!newString) {
      return;
    }
    const newStrings = [...strings, newString];
    setStrings(newStrings);
    onStringsChanged(newStrings);
    setNewString('');
  };

  const removeString = (index: number) => {
    const newStrings = [...strings];
    newStrings.splice(index, 1);
    setStrings(newStrings);
    onStringsChanged(newStrings);
  };

  return (
    <div className={styles.container}>
      <div className={styles['input-container']}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a tag"
          value={newString}
          onChange={(e) => setNewString(e.target.value)}
        />
        <button type="button" className={styles.button} onClick={addString}>
          Add
        </button>
      </div>
      <div className={styles['tag-container']}>
        {strings.map((string, index) => (
          <div className={styles.string} key={string}>
            <span>{string}</span>
            <button
              type="button"
              className={styles['remove-button']}
              onClick={() => removeString(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagList;
