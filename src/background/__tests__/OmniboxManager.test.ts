import OmniboxManager from '../OmniboxManager';
import { DBMock, RedirectManagerMock } from './common.mock';

describe('OmniboxManager', () => {
  const omniboxManager = OmniboxManager('o', DBMock, RedirectManagerMock);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sends suggestions on input changed', (done) => {
    const sendSuggestionsMock = jest.fn();
    const similaritiesMock = [
      {
        link: {
          rawLink: 'w/abc',
          slug: 'abc',
        },
      } as Similarity,
    ];
    const expectedSuggestions = [
      {
        content: similaritiesMock[0].link.rawLink,
        description: similaritiesMock[0].link.slug,
      },
    ];
    const getSimilaritiesMock = jest
      .spyOn(DBMock, 'getSimilarities')
      .mockImplementationOnce(() => Promise.resolve(similaritiesMock));
    omniboxManager.onInputChanged('a', sendSuggestionsMock);
    setImmediate(() => {
      expect(getSimilaritiesMock).toHaveBeenCalledTimes(1);
      expect(sendSuggestionsMock).toHaveBeenCalledWith(expectedSuggestions);
      done();
    });
  });

  describe('handles on input entered', () => {
    it('tries to fix link with no domain', (done) => {
      const expectedExternalLink = 'http://resolved';
      const expectedLink = { domain: 'o', rawLink: 'o/link', slug: 'link' };
      const getExternalLinkMock = jest
        .spyOn(DBMock, 'getExternalLink')
        .mockImplementationOnce(() => Promise.resolve(expectedExternalLink));
      const redirectSpy = jest.spyOn(RedirectManagerMock, 'redirect');
      omniboxManager.onInputEntered('link');
      setImmediate(() => {
        expect(getExternalLinkMock).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith(expectedLink, expectedExternalLink);
        done();
      });
    });
    it('gets external and redirects on link with domain', (done) => {
      const expectedExternalLink = 'http://resolved';
      const expectedLink = { domain: 'o', rawLink: 'o/link', slug: 'link' };
      const getExternalLinkMock = jest
        .spyOn(DBMock, 'getExternalLink')
        .mockImplementationOnce(() => Promise.resolve(expectedExternalLink));
      const redirectSpy = jest.spyOn(RedirectManagerMock, 'redirect');
      omniboxManager.onInputEntered('o/link');
      setImmediate(() => {
        expect(getExternalLinkMock).toHaveBeenCalledTimes(1);
        expect(redirectSpy).toHaveBeenCalledWith(expectedLink, expectedExternalLink);
        done();
      });
    });
  });
});
