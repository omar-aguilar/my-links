import { useState } from 'react';
import BaseTextInput, { InputProps } from './BaseTextInput';

const TextInputWithButton = ({ name, onChange }: InputProps) => {
  const [currentValue, setCurrentValue] = useState('');

  const onAdd = () => {
    onChange(currentValue);
    setCurrentValue('');
  };

  return (
    <div
      className="flex grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 
    focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
    >
      <BaseTextInput
        name={name}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
      />
      <button
        type="button"
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold 
        py-1 px-2 rounded border border-gray-400 "
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
};

export default TextInputWithButton;
