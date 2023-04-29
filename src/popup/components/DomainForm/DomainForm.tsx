import { useEffect, useState } from 'react';
import TextField from '../TextField';

type DomainFormProps = {
  title: string;
  buttonLabel: string;
  defaultValues?: DomainEntry;
  onAction: (domainEntry: DomainEntry) => void;
};

const DomainForm = ({ title, buttonLabel, onAction, defaultValues }: DomainFormProps) => {
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!defaultValues) {
      setDomain('');
      setDescription('');
      return;
    }
    setDescription(defaultValues.description);
    setDomain(defaultValues.domain);
  }, [defaultValues]);

  return (
    <form className="my-2 p-2 rounded shadow-md rounded border border-gray-400">
      <h2 className="font-bold mb-2">{title}</h2>
      <TextField label="Domain" value={domain} onChange={(newValue) => setDomain(newValue)} />
      <TextField
        label="Description"
        value={description}
        onChange={(newValue) => setDescription(newValue)}
      />
      <button
        type="button"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border
    border-gray-400 rounded shadow text-base"
        onClick={() => onAction({ domain, description })}
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default DomainForm;
