import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useBrowserAPIs from '@/pages/_shared/MainContext/useBrowserAPIs';
import { shortLinkMessageCreators } from '@/shared/messages';
import getHTTPSURLString from '@/shared/utils/getHTTPSURLString';
import XMarkIcon from '../../icons/XMark';
import PencilIcon from '../../icons/Pencil';
import TagList from './TagList';
import proxy from '../Notification/proxy';

type ShortLinkEntryProps = {
  entry: ShortLinkEntry;
  showAdmin: boolean;
};

const ShortLinkEntry = ({ entry, showAdmin }: ShortLinkEntryProps) => {
  const { sendMessage, redirect } = useBrowserAPIs();
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
    const response = await sendMessage(shortLinkMessageCreators.delete(shortLink));

    if (response.success) {
      proxy.setNotification({
        type: 'success',
        message: `Short link ${shortLink} successfully deleted`,
      });
    } else {
      proxy.setNotification({
        type: 'error',
        message: `Short link ${shortLink} not deleted ${response.error}`,
      });
    }
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    redirect.resolver.setLink(shortLink).go();
  };

  return (
    <div className="border py-2 px-4 rounded bg-gray-50 flex">
      <div className="flex justify-center flex-col grow">
        <a
          className="text-violet-500 text-sm font-bold"
          href={getHTTPSURLString(shortLink)}
          onClick={handleClick}
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
