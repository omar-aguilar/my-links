import { ComponentType, useCallback, useEffect, useState } from 'react';
import BaseTextInput, { InputProps } from './BaseTextInput';

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  Input?: ComponentType<InputProps>;
  validate?: (value: string) => boolean;
  errorMessage?: string;
  onError?: (errorValue: boolean) => void;
};

const defaultValidate = () => true;

const TextField = ({
  label,
  value,
  readOnly = false,
  onChange,
  Input = BaseTextInput,
  validate = defaultValidate,
  errorMessage,
  onError,
}: TextFieldProps) => {
  const [error, setError] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleError = useCallback(
    (hasError: boolean) => {
      setError(hasError);
      onError?.(hasError);
    },
    [onError]
  );

  useEffect(() => {
    const isValid = validate(value);
    handleError(!isValid);
    setCurrentValue(value);
  }, [value, handleError, validate]);

  const handleChange = (newValue: string) => {
    const isValid = validate(newValue);
    handleError(!isValid);
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
        {error && <div className="text-red-500 text-sm">{errorMessage || 'Error'}</div>}
      </label>
    </div>
  );
};

export default TextField;
