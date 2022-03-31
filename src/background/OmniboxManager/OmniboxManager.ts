import Link from '../LinkManager/Link';

function OmniboxManager(
  domain: Domain,
  db: DB,
  redirectManager: RedirectManager
): ChromeOmniboxManager {
  const onInputEntered: ChromeOmniboxManager.OnInputEntered = (rawLink) => {
    const isDomainWithinLink = rawLink.startsWith(domain);
    const rawLinkFixed = isDomainWithinLink ? rawLink : `${domain}/${rawLink}`;
    const link = new Link(rawLinkFixed);
    db.getExternalLink(link).then((externalLink) => {
      redirectManager.redirect(link, externalLink);
    });
    return true;
  };

  const onInputChanged: ChromeOmniboxManager.OnInputChanged = (inputText, sendSuggestions) => {
    const internalLink = inputText;
    const link = new Link(`${domain}/${internalLink}`);
    db.getSimilarities(link).then((similarities) => {
      const suggestions = similarities.map<chrome.omnibox.SuggestResult>((similarity) => {
        return {
          content: similarity.link.rawLink,
          // description: `
          //   <url>${similarity.link.slug}</url>
          //   <dim>${similarity.description}</dim>
          // `,
          description: similarity.link.slug,
        };
      });
      sendSuggestions(suggestions);
    });
    return true;
  };

  return { onInputEntered, onInputChanged };
}

export default OmniboxManager;
