import Link from '../LinkManager/Link';
import NavigationManager from '../NavigationManager';
import { DBMock, LinkManagerMock, RedirectManagerMock } from './common.mock';

describe('NavigationManager', () => {
  const navigationManager = NavigationManager(['o'], LinkManagerMock, DBMock, RedirectManagerMock);
  jest.spyOn(globalThis.console, 'error').mockImplementation();
  jest.spyOn(globalThis.console, 'log').mockImplementation();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ignores navigation if not in main frame', () => {
    const mockDetails = {
      frameId: 101,
    } as chrome.webNavigation.WebNavigationParentedCallbackDetails;
    const urlSpy = jest.spyOn(window, 'URL');
    navigationManager.onBeforeNavigate(mockDetails);
    expect(urlSpy).not.toHaveBeenCalled();
    urlSpy.mockRestore();
  });

  it('ignores when the url does not have a valid link', () => {
    const mockDetails = {
      frameId: 0,
      url: 'http://link',
    } as chrome.webNavigation.WebNavigationParentedCallbackDetails;
    const linkMock = new Link();
    const getLinkSpy = jest
      .spyOn(LinkManagerMock, 'getLink')
      .mockImplementationOnce(() => Promise.resolve(linkMock));
    const getExternalLinkSpy = jest.spyOn(DBMock, 'getExternalLink');
    navigationManager.onBeforeNavigate(mockDetails);
    expect(getLinkSpy).toHaveBeenCalledTimes(1);
    expect(getExternalLinkSpy).not.toHaveBeenCalled();
  });

  it('ignores link that are not with valid domain', () => {
    const mockDetails = {
      frameId: 0,
      url: 'http://a/link',
    } as chrome.webNavigation.WebNavigationParentedCallbackDetails;
    const linkMock = new Link('a/link');
    const getLinkSpy = jest
      .spyOn(LinkManagerMock, 'getLink')
      .mockImplementationOnce(() => Promise.resolve(linkMock));
    const getExternalLinkSpy = jest.spyOn(DBMock, 'getExternalLink');
    navigationManager.onBeforeNavigate(mockDetails);
    expect(getLinkSpy).toHaveBeenCalledTimes(1);
    expect(getExternalLinkSpy).not.toHaveBeenCalled();
  });

  it('successfully redirects when valid link', (done) => {
    const mockDetails = {
      frameId: 0,
      url: 'http://o/link',
    } as chrome.webNavigation.WebNavigationParentedCallbackDetails;
    const linkMock = new Link('o/link');
    const getLinkSpy = jest
      .spyOn(LinkManagerMock, 'getLink')
      .mockImplementationOnce(() => Promise.resolve(linkMock));
    const getExternalLinkSpy = jest
      .spyOn(DBMock, 'getExternalLink')
      .mockImplementationOnce(() => Promise.resolve('http://resolved-link'));
    const redirectSpy = jest.spyOn(RedirectManagerMock, 'redirect');
    navigationManager.onBeforeNavigate(mockDetails);
    setImmediate(() => {
      expect(getLinkSpy).toHaveBeenCalledTimes(1);
      expect(getExternalLinkSpy).toHaveBeenCalledTimes(1);
      expect(redirectSpy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('fails on error', (done) => {
    const mockDetails = {
      frameId: 0,
      url: 'http://o/link',
    } as chrome.webNavigation.WebNavigationParentedCallbackDetails;
    const getLinkSpy = jest
      .spyOn(LinkManagerMock, 'getLink')
      .mockImplementationOnce(() => Promise.reject());
    const getExternalLinkSpy = jest.spyOn(DBMock, 'getExternalLink');
    navigationManager.onBeforeNavigate(mockDetails);
    setImmediate(() => {
      expect(getLinkSpy).toHaveBeenCalledTimes(1);
      expect(getExternalLinkSpy).not.toHaveBeenCalled();
      done();
    });
  });
});
