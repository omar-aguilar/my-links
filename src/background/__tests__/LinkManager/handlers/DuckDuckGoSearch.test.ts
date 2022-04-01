import { DuckDuckGoSearch } from '../../../LinkManager/handlers';

describe('DuckDuckGoSearch', () => {
  it('handles links within duck duck go search engine', () => {
    const mockDomain = 'domain';
    const mockSlug = 'slug-test';
    const expectedRawLink = `${mockDomain}/${mockSlug}`;
    const mockURL = new URL(`https://duckduckgo.com/search?q=${mockDomain}/${mockSlug}`);
    const customDomain = DuckDuckGoSearch();
    expect(customDomain.canHandleURL(mockURL)).toBeTruthy();
    expect(customDomain.getRawLink(mockURL)).toBe(expectedRawLink);
  });

  it('returns empty links when no search query param is set', () => {
    const mockURL = new URL('https://duckduckgo.com/search');
    const customDomain = DuckDuckGoSearch();
    expect(customDomain.getRawLink(mockURL)).toBe('');
  });
});
