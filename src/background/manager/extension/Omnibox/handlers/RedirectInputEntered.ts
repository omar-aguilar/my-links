import { getDomainInput, getResolverURLFromShortLink } from '../../../../utils';

const RedirectInputEntered = (browserAPIs: BrowserAPIs) => {
  const inputEntered: OmniboxWrapper.OnInputEnteredCallback = async (input: string) => {
    const domainInput = getDomainInput(input);
    const redirectURL = getResolverURLFromShortLink(browserAPIs.runtime, domainInput);
    browserAPIs.tabs.updateCurrent({ url: redirectURL });
  };

  return inputEntered;
};

export default RedirectInputEntered;
