import { useEffect, useState } from 'react';
import TextField, { TextInputWithDomainSelector, BaseTextInput } from '../TextField';
import TagList from '../TagList';

type ShortLinkProps = {
  title: string;
  initShortLink?: string;
  buttonLabel: string;
  defaultValues?: ShortLinkEntry;
  onAction: (shortLink: ShortLinkEntry) => void;
};

const ShortLinkForm = ({
  title,
  initShortLink = '',
  buttonLabel,
  defaultValues,
  onAction,
}: ShortLinkProps) => {
  const [shortLink, setShortLink] = useState(initShortLink);
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState(false);

  const handleError = (hasError: boolean) => {
    setError(hasError);
  };

  useEffect(() => {
    const isSameShortLink = defaultValues?.shortLink === initShortLink;
    if (!defaultValues || !isSameShortLink) {
      return;
    }
    setLink(defaultValues.link);
    setDescription(defaultValues.description);
    setTags(defaultValues.tags);
  }, [defaultValues, initShortLink]);

  useEffect(() => {
    setShortLink(initShortLink);
  }, [initShortLink]);

  return (
    <form className="my-2 p-2 rounded shadow-md rounded border border-gray-400">
      <h2 className="font-bold mb-2">{title}</h2>
      <div className="columns-2">
        <TextField
          label="Short Link"
          value={shortLink}
          onChange={(value) => setShortLink(value)}
          readOnly={Boolean(initShortLink)}
          Input={initShortLink ? BaseTextInput : TextInputWithDomainSelector}
          validate={(value) => /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/.test(value)}
          errorMessage='Short link should only include letters, numbers, and "-"'
          onError={handleError}
        />
        <TextField
          label="Destination"
          value={link}
          onChange={(value) => setLink(value)}
          validate={(value) => /^https:\/\/.+$/.test(value)}
          errorMessage='Destination should start with "https://"'
          onError={handleError}
        />
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
    border-gray-400 rounded shadow text-base disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => onAction({ shortLink, link, description, tags })}
        disabled={error}
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default ShortLinkForm;
