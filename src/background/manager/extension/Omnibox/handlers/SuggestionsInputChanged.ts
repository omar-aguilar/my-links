type Suggestion = chrome.omnibox.Suggestion;

const SuggestionsInputChanged = (shortLinksAPI: ShortLinkAPI, domainsAPI: DomainsAPI) => {
  const inputChanged: OmniboxWrapper.OnInputChangedCallback<Suggestion> = async (
    input,
    suggest
  ) => {
    const { data: mainDomain } = await domainsAPI.getMainDomain();
    const { data: searchResults } = await shortLinksAPI.search(mainDomain, { shortLink: input });
    const suggestions = searchResults.map<Suggestion>((searchResult) => {
      return {
        content: searchResult.shortLink,
        description: `
          <url>${searchResult.shortLink}</url>
          <dim>${searchResult.description}</dim>
        `,
      };
    });
    suggest(suggestions);
  };

  return inputChanged;
};

export default SuggestionsInputChanged;
