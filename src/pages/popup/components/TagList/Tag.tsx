import XMark from '../../icons/XMark';

type TagProps = {
  value: string;
  onRemove: () => void;
};

const Tag = ({ value, onRemove }: TagProps) => {
  return (
    <div className="flex items-center bg-gray-200 rounded p-1 mr-2">
      <div className="text-bold">{value}</div>
      <XMark onClick={onRemove} />
    </div>
  );
};

export default Tag;
