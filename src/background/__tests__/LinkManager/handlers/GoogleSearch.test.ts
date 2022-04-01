import { GoogleSearch } from '../../../LinkManager/handlers';

describe('GoogleSearch', () => {
  it('handles links within google search engine', () => {
    const mockDomain = 'domain';
    const mockSlug = 'slug-test';
    const expectedRawLink = `${mockDomain}/${mockSlug}`;
    const mockURL = new URL(`https://google.com/search?q=${mockDomain}/${mockSlug}`);
    const customDomain = GoogleSearch();
    expect(customDomain.canHandleURL(mockURL)).toBeTruthy();
    expect(customDomain.getRawLink(mockURL)).toBe(expectedRawLink);
  });

  it('returns empty links when no search query param is set', () => {
    const mockURL = new URL('https://google.com/search');
    const customDomain = GoogleSearch();
    expect(customDomain.getRawLink(mockURL)).toBe('');
  });
});
