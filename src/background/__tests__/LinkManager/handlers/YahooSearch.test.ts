import { YahooSearch } from '../../../LinkManager/handlers';

describe('YahooSearch', () => {
  it('handles links within yahoo search engine', () => {
    const mockDomain = 'domain';
    const mockSlug = 'slug-test';
    const expectedRawLink = `${mockDomain}/${mockSlug}`;
    const mockURL = new URL(`https://yahoo.com/search?p=${mockDomain}/${mockSlug}`);
    const customDomain = YahooSearch();
    expect(customDomain.canHandleURL(mockURL)).toBeTruthy();
    expect(customDomain.getRawLink(mockURL)).toBe(expectedRawLink);
  });

  it('returns empty links when no search query param is set', () => {
    const mockURL = new URL('https://yahoo.com/search');
    const customDomain = YahooSearch();
    expect(customDomain.getRawLink(mockURL)).toBe('');
  });
});
