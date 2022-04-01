import { BingSearch } from '../../../LinkManager/handlers';

describe('BingSearch', () => {
  it('handles links within bing search engine', () => {
    const mockDomain = 'domain';
    const mockSlug = 'slug-test';
    const expectedRawLink = `${mockDomain}/${mockSlug}`;
    const mockURL = new URL(`https://www.bing.com/search?q=${mockDomain}/${mockSlug}`);
    const customDomain = BingSearch();
    expect(customDomain.canHandleURL(mockURL)).toBeTruthy();
    expect(customDomain.getRawLink(mockURL)).toBe(expectedRawLink);
  });

  it('returns empty links when no search query param is set', () => {
    const mockURL = new URL('https://www.bing.com/search');
    const customDomain = BingSearch();
    expect(customDomain.getRawLink(mockURL)).toBe('');
  });
});
