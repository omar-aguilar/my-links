import Download from '../../icons/Download';
import XMarkIcon from '../../icons/XMark';
import PencilIcon from '../../icons/Pencil';

type DomainProps = {
  domain: DomainEntry;
  isMainDomain: boolean;
  onEdit: (domain: DomainEntry) => void;
  onDelete: (domain: string) => void;
  onDownload: (domain: string) => void;
};

const Domain = ({ domain, isMainDomain, onDelete, onEdit, onDownload }: DomainProps) => {
  const description = isMainDomain ? 'Main Domain' : domain.description;
  return (
    <div className="border py-2 px-4 rounded bg-gray-50 flex">
      <div className="flex justify-center flex-col grow">
        <div className="text-violet-500 text-sm font-bold">{domain.domain}</div>
        <div>{description}</div>
      </div>
      <div className="flex items-center gap-1">
        <Download
          className="fill-blue-500 cursor-pointer hover:fill-blue-700"
          onClick={() => onDownload(domain.domain)}
        />
        {!isMainDomain && (
          <>
            <PencilIcon
              className="fill-blue-500 cursor-pointer hover:fill-blue-700"
              onClick={() => onEdit(domain)}
            />
            <XMarkIcon
              className="fill-red-500 cursor-pointer hover:fill-red-700"
              onClick={() => onDelete(domain.domain)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Domain;
