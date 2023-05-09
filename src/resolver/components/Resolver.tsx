import { useEffect, useState } from 'react';
import { shortLinkMessageCreators } from '../../shared/messages';
import { getRedirectURLFromShortLinkEntry } from '../../background/utils';
import Spinner from '../Spinner';
import useBrowserAPIs from '../../pages/common/MainContext/useBrowserAPIs';

enum State {
  Loading,
  NoLink,
}

const App = () => {
  const browserAPIs = useBrowserAPIs();
  const [state, setState] = useState<State>(State.Loading);

  useEffect(() => {
    const resolveLink = async (shortLink: string) => {
      const response = await browserAPIs.runtime.sendMessage(
        shortLinkMessageCreators.get(shortLink)
      );
      const { shortLinkEntry } = response;
      const redirectURL = getRedirectURLFromShortLinkEntry(browserAPIs.runtime, shortLinkEntry);
      browserAPIs.tabs.updateCurrent({ url: redirectURL });
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
  }, [browserAPIs.tabs, browserAPIs.runtime]);

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
