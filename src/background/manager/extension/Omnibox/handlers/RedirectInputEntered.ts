import { getDomainInput, getRedirectURLFromShortLinkEntry } from '../../../../utils';

const RedirectInputEntered = (browserAPIs: BrowserAPIs, api: ShortLinkAPI) => {
  const inputEntered: OmniboxWrapper.OnInputEnteredCallback = async (input: string) => {
    const domainInput = getDomainInput(input);
    const { data: shortLinkEntry } = await api.resolve(domainInput);
    const redirectURL = getRedirectURLFromShortLinkEntry(browserAPIs.runtime, shortLinkEntry);
    browserAPIs.tabs.updateCurrent({ url: redirectURL });
  };

  return inputEntered;
};

export default RedirectInputEntered;
