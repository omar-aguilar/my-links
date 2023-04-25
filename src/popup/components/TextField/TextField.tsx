import { ComponentType } from 'react';
import BaseTextInput, { InputProps } from './BaseTextInput';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  Input?: ComponentType<InputProps>;
};

const TextField = ({ label, value, Input = BaseTextInput, onChange }: TextFieldProps) => {
  return (
    <div className="mb-2">
      <label className="block" htmlFor={label}>
        <div className="mr-2 text-base text-slate-700 font-bold">{label}</div>
        <div
          className="flex grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300
         focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
        >
          <Input name={label} value={value} onChange={onChange} />
        </div>
      </label>
    </div>
  );
};

export default TextField;
