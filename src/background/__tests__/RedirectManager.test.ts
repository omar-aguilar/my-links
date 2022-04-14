import Link from '../LinkManager/Link';
import RedirectManager from '../RedirectManager';
import { ChromeMock } from './common.mock';

describe('RedirectManager', () => {
  const redirectManager = RedirectManager(ChromeMock.tabs, ChromeMock.runtime);

  it('redirects to external link when external link is not empty', () => {
    const updateSpy = jest.spyOn(ChromeMock.tabs, 'update');
    const linkMock = new Link('o/link');
    const externalLinkMock = 'http://resolved';
    redirectManager.redirect(linkMock, externalLinkMock);
    expect(updateSpy).toHaveBeenCalledWith({ url: externalLinkMock });
  });

  it('redirects to page not found when external link is empty', () => {
    const updateSpy = jest.spyOn(ChromeMock.tabs, 'update');
    const getURLMockResult = 'extension-path.html';
    const expectedPrefix = `${getURLMockResult}#/link-not-found?link=`;
    const expectedRawLink = 'o/link';
    const getURLSpy = jest
      .spyOn(ChromeMock.runtime, 'getURL')
      .mockImplementation(() => getURLMockResult);
    const linkMock = new Link(expectedRawLink);
    const externalLinkMock = '';
    redirectManager.redirect(linkMock, externalLinkMock);
    expect(getURLSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalledWith({ url: `${expectedPrefix}${expectedRawLink}` });
  });
});
