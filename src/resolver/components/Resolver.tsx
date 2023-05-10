import { useEffect, useState } from 'react';
import { shortLinkMessageCreators } from '../../shared/messages';
import Spinner from '../Spinner';
import useBrowserAPIs from '../../pages/common/MainContext/useBrowserAPIs';

enum State {
  Loading,
  NoLink,
}

const App = () => {
  const { sendMessage, redirect } = useBrowserAPIs();
  const [state, setState] = useState<State>(State.Loading);

  useEffect(() => {
    const resolveLink = async (shortLink: string) => {
      const response = await sendMessage(shortLinkMessageCreators.get(shortLink));
      const { shortLinkEntry } = response;
      redirect.main.setLink(shortLinkEntry.link).setFallback(shortLinkEntry.shortLink).go();
      // hack to close the popup
      setTimeout(() => {
        window.close();
      }, 1000);
    };
    const searchParams = new URLSearchParams(window.location.search);
    const shortLink = searchParams.get('shortLink');
    if (!shortLink) {
      setState(State.NoLink);
      return;
    }
    resolveLink(shortLink);
  }, [sendMessage, redirect]);

  return (
    <div className="flex grow items-center justify-center">
      {state === State.Loading && (
        <div className="flex row gap-1">
          <Spinner />
          <h1>Resolving Short Link</h1>
        </div>
      )}
      {state === State.NoLink && <h1>No Link Provided</h1>}
    </div>
  );
};

export default App;
