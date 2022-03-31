function RedirectManager(
  tabs: typeof chrome.tabs,
  runtime: typeof chrome.runtime
): RedirectManager {
  const redirect = (link: Link, externalLink: ExternalLink) => {
    if (!externalLink) {
      const popupUrl = runtime.getURL('popup.html');
      tabs.update({
        url: `${popupUrl}#/link-not-found?link=${link.rawLink}`,
      });
      return;
    }
    tabs.update({ url: externalLink });
  };

  return { redirect };
}

export default RedirectManager;
