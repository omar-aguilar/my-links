import { parseShortLink } from '@/shared/utils';
import BaseTextInput, { InputProps } from './BaseTextInput';

const TextInputWithDomain = ({ name, value, onChange }: InputProps) => {
  const shortLink = parseShortLink(value);
  return (
    <div
      className="flex grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
    >
      <span className="flex select-none items-center pl-3 text-gray-500">{shortLink.domain}/</span>
      <BaseTextInput
        name={name}
        value={shortLink.slug}
        onChange={(newValue) => onChange(`${shortLink.domain}/${newValue}`)}
      />
    </div>
  );
};

export default TextInputWithDomain;
