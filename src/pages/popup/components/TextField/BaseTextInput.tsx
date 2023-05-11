export type InputProps = {
  name: string;
  value: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
};

const BaseTextInput = ({ name, value, onChange, readOnly = false }: InputProps) => {
  return (
    <input
      type="text"
      name={name}
      id={name}
      readOnly={readOnly}
      disabled={readOnly}
      autoComplete="off"
      className="block focus:outline-none flex-1 border-none bg-transparent py-1.5 px-1 
      text-gray-900 placeholder:text-gray-400 focus:ring-0 text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default BaseTextInput;
