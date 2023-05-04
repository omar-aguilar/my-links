import { useNavigate } from 'react-router-dom';
import XMarkIcon from '../../icons/XMark';
import PencilIcon from '../../icons/Pencil';
import TagList from './TagList';
import { shortLinkMessageCreators } from '../../../background/manager/extension/Message';
import getBrowserAPIs from '../../../background/api/web-extension';
import { getResolverURLFromShortLink } from '../../../background/utils';

type ShortLinkEntryProps = {
  entry: ShortLinkEntry;
  showAdmin: boolean;
};

const browserAPIs = getBrowserAPIs();

const ShortLinkEntry = ({ entry, showAdmin }: ShortLinkEntryProps) => {
  const navigate = useNavigate();
  const { shortLink, description } = entry;
  const redirectToAddLink = () => {
    navigate(`/update-link?shortLink=${shortLink}`);
  };

  const deleteLink = async () => {
    // eslint-disable-next-line no-alert
    const proceed = window.confirm(`Are you sure you want to delete ${shortLink}?`);
    if (!proceed) {
      return;
    }
    const response = await browserAPIs.runtime.sendMessage(
      shortLinkMessageCreators.delete(shortLink)
    );
    console.log({ response });
  };

  return (
    <div className="border py-2 px-4 rounded bg-gray-50 flex">
      <div className="flex justify-center flex-col grow">
        <a
          className="text-violet-500 text-sm font-bold"
          href={getResolverURLFromShortLink(browserAPIs.runtime, shortLink)}
          data-tooltip-target="tooltip-default"
        >
          {shortLink}
        </a>
        {description && <div>{description}</div>}
        <TagList tags={entry.tags} />
      </div>
      {showAdmin && (
        <div>
          <XMarkIcon className="fill-red-500 cursor-pointer" onClick={deleteLink} />
          <PencilIcon className="fill-blue-500 cursor-pointer" onClick={redirectToAddLink} />
        </div>
      )}
    </div>
  );
};

export default ShortLinkEntry;
