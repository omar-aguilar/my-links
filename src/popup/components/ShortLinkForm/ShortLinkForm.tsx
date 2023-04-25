import { useState } from 'react';
import TextField, { TextInputWithDomain } from '../TextField';
import TagList from '../TagList';

type ShortLinkProps = {
  initShortLink?: string;
  buttonLabel: string;
  onAction: (shortLink: ShortLinkEntry) => void;
};

const ShortLinkForm = ({ initShortLink = '', buttonLabel, onAction }: ShortLinkProps) => {
  const [shortLink, setShortLink] = useState(initShortLink);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  return (
    <form className="my-2 p-2 rounded shadow-md rounded border border-gray-400">
      <h2 className="font-bold mb-2">Create new short link</h2>
      <div className="columns-2">
        <TextField
          label="Short Link"
          value={shortLink}
          onChange={(value) => setShortLink(value)}
          Input={TextInputWithDomain}
        />
        <TextField label="Destination" value={link} onChange={(value) => setLink(value)} />
      </div>
      <TextField
        label="Description"
        value={description}
        onChange={(value) => setDescription(value)}
      />
      <div className="w-1/2">
        <TagList value={tags} onChanged={(newTags) => setTags(newTags)} />
      </div>

      <button
        type="button"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border
    border-gray-400 rounded shadow text-base"
        onClick={() => onAction({ shortLink, link, description, tags })}
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default ShortLinkForm;
