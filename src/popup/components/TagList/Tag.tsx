import XMarkIcon from '../../icons/XMarkIcon';

type TagProps = {
  value: string;
  onRemove: () => void;
};

const Tag = ({ value, onRemove }: TagProps) => {
  return (
    <div className="flex items-center bg-gray-200 rounded p-1 mr-2">
      <div className="text-bold">{value}</div>
      <XMarkIcon onClick={onRemove} />
    </div>
  );
};

export default Tag;
