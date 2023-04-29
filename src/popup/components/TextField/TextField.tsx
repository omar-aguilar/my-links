import { ComponentType, useEffect, useState } from 'react';
import BaseTextInput, { InputProps } from './BaseTextInput';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  Input?: ComponentType<InputProps>;
};

const TextField = ({
  label,
  value,
  readOnly = false,
  onChange,
  Input = BaseTextInput,
}: TextFieldProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setCurrentValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="mb-2">
      <label className="block" htmlFor={label}>
        <div className="mr-2 text-base text-slate-700 font-bold">{label}</div>
        <div
          className="flex grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300
         focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
        >
          <Input name={label} value={currentValue} onChange={handleChange} readOnly={readOnly} />
        </div>
      </label>
    </div>
  );
};

export default TextField;
