function NavigationManager(
  domains: Domain[],
  linkManager: LinkManager,
  db: DB,
  redirectManager: RedirectManager
): ChromeNavigationManager {
  const onBeforeNavigate: ChromeNavigationManager.OnBeforeNavigate = async (details) => {
    const { url, frameId } = details;
    if (frameId !== 0) {
      console.log('not in the main window, ignoring');
      return;
    }
    const linkURL = new URL(url);
    try {
      const link = await linkManager.getLink(linkURL);
      if (!link.isValid()) {
        console.log('not a valid link, skipping');
        return;
      }
      if (!domains.includes(link.domain)) {
        console.log('not a valid domain, skipping');
        return;
      }

      const externalLink = await db.getExternalLink(link);
      redirectManager.redirect(link, externalLink);
    } catch (err) {
      console.error(err);
    }
  };

  return { onBeforeNavigate };
}

export default NavigationManager;
