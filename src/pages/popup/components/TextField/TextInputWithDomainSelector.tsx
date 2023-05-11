import { useEffect, useState } from 'react';
import { parseShortLink } from '@/shared/utils';
import useBrowserAPIs from '@/pages/_shared/MainContext/useBrowserAPIs';
import { domainMessageCreators } from '@/shared/messages';
import BaseTextInput, { InputProps } from './BaseTextInput';

const TextInputWithDomainSelector = ({ name, value, onChange }: InputProps) => {
  const { sendMessage } = useBrowserAPIs();
  const shortLink = parseShortLink(value);
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState(shortLink.domain);

  useEffect(() => {
    const getDomains = async () => {
      const response = await sendMessage(domainMessageCreators.search({ prefix: '' }));
      const registeredDomains: DomainEntry[] = response.domainEntries;
      setDomains(registeredDomains.map(({ domain }) => domain));
      setSelectedDomain(registeredDomains[0].domain);
    };
    getDomains();
  }, [sendMessage]);

  return (
    <div
      className="flex grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
    >
      <select
        className="text-gray-500 block focus:outline-none border-none bg-transparent py-1.5 px-1 
      text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm"
        value={selectedDomain}
        onChange={(e) => setSelectedDomain(e.target.value)}
      >
        {domains.map((domain) => {
          return (
            <option key={domain} value={domain}>
              {domain}/
            </option>
          );
        })}
      </select>
      <BaseTextInput
        name={name}
        value={shortLink.slug}
        onChange={(newValue) => onChange(`${selectedDomain}/${newValue}`)}
      />
    </div>
  );
};

export default TextInputWithDomainSelector;
