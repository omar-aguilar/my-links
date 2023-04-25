import { useState } from 'react';
import TextField, { TextInputWithButton } from '../TextField';
import Tag from './Tag';

type TagListProps = {
  value: string[];
  onChanged: (strings: string[]) => void;
};

const TagList = ({ value, onChanged }: TagListProps) => {
  const [tags, setTags] = useState(value);

  const addString = (newTag: string) => {
    if (!newTag) {
      return;
    }
    const isExistingTag = tags.find((tag) => tag === newTag);
    if (isExistingTag) {
      return;
    }

    const newStrings = [...tags, newTag];
    setTags(newStrings);
    onChanged(newStrings);
  };

  const removeString = (index: number) => {
    const newStrings = [...tags];
    newStrings.splice(index, 1);
    setTags(newStrings);
    onChanged(newStrings);
  };

  return (
    <>
      <TextField label="Tag List" value="" onChange={addString} Input={TextInputWithButton} />
      <div className="flex mb-2">
        {tags.map((tag, index) => (
          <Tag key={tag} value={tag} onRemove={() => removeString(index)} />
        ))}
      </div>
    </>
  );
};

export default TagList;
