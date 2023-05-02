import { getDomainInput } from '../../../../utils';

type Suggestion = chrome.omnibox.Suggestion;

const SuggestionsInputChanged = (api: ShortLinkAPI) => {
  const inputChanged: OmniboxWrapper.OnInputChangedCallback<Suggestion> = async (
    input,
    suggest
  ) => {
    const domainInput = getDomainInput(input);
    const { data: searchResults } = await api.search(domainInput);
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
