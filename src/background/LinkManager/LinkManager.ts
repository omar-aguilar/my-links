import Link from './Link';

function LinkManager(linkHandlers: RawLinkHandler[]): LinkManager {
  function getRawLink(url: URL): RawLink | undefined {
    const handler = linkHandlers.find((linkHandler) => {
      if (!linkHandler.canHandleURL(url)) {
        return false;
      }
      return linkHandler;
    });
    return handler?.getRawLink(url);
  }

  function getLink(url: SourceLink): Promise<Link> {
    const rawLink = getRawLink(url);
    const link = new Link(rawLink);
    return Promise.resolve(link);
  }

  return {
    getLink,
  };
}

export default LinkManager;
