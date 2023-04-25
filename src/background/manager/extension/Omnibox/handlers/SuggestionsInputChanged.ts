import { getDomainInput } from '../../../../utils';

type Suggestion = chrome.omnibox.Suggestion;

const SuggestionsInputChanged = (api: ShortLinkAPI) => {
  const inputChanged: OmniboxWrapper.OnInputChangedCallback<Suggestion> = async (
    input,
    suggest
  ) => {
    const domainInput = getDomainInput(input);
    const similarities = await api.search(domainInput);
    const suggestions = similarities.map<Suggestion>((similarity) => {
      return {
        content: similarity.shortLink,
        description: `
          <url>${similarity.shortLink}</url>
          <dim>${similarity.description}</dim>
        `,
      };
    });
    suggest(suggestions);
  };

  return inputChanged;
};

export default SuggestionsInputChanged;
