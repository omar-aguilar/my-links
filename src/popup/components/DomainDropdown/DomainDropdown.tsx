import { useEffect, useState } from 'react';
import { getRegisteredDomains } from '../../../background/utils';

type DomainDropdownProps = {
  onChange: (domain: string) => void;
};

const DomainDropdown = ({ onChange }: DomainDropdownProps) => {
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState('');

  useEffect(() => {
    const getDomains = async () => {
      const registeredDomains = await getRegisteredDomains();
      setDomains(['', ...registeredDomains.map(({ domain }) => domain)]);
    };
    getDomains();
  }, []);

  return (
    <div className="mb-2">
      <label className="block" htmlFor="domain-selector">
        <div className="mr-2 text-base text-slate-700 font-bold">Domain</div>
        <div
          className="flex grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 inline-flex"
        >
          <select
            className="text-gray-500 block focus:outline-none border-none bg-transparent py-1.5 px-1
      text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm"
            id="domain-selector"
            value={selectedDomain}
            onChange={(e) => {
              const domain = e.target.value;
              setSelectedDomain(domain);
              onChange(domain);
            }}
          >
            {domains.map((domain) => {
              const domainLabel = domain ? `${domain}/` : '';
              return (
                <option key={domain} value={domain}>
                  {domainLabel}
                </option>
              );
            })}
          </select>
        </div>
      </label>
    </div>
  );
};

export default DomainDropdown;
