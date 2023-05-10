import type { ExtensionRedirect } from '../../../../../shared/utils/extensionRedirect';

const RedirectInputEntered = (redirect: ReturnType<ExtensionRedirect>, domainsAPI: DomainsAPI) => {
  const inputEntered: OmniboxWrapper.OnInputEnteredCallback = async (input: string) => {
    const { data: mainDomain } = await domainsAPI.getMainDomain();
    const shortLink = `${mainDomain}/${input}`;
    redirect.resolver.setLink(shortLink).go();
  };

  return inputEntered;
};

export default RedirectInputEntered;
