import Link from '../../LinkManager/Link';

describe('Link', () => {
  it('returns a valid link', () => {
    const mockDomain = 'domain';
    const mockSlug = 'test-slug';
    const mockRawLink = `${mockDomain}/${mockSlug}`;
    const link = new Link(mockRawLink);
    expect(link.domain).toBe(mockDomain);
    expect(link.slug).toBe(mockSlug);
    expect(link.toString()).toBe(mockRawLink);
  });

  it('returns an invalid link', () => {
    const link = new Link();
    expect(link.domain).toBe('');
    expect(link.slug).toBe('');
    expect(link.isValid()).toBeFalsy();
  });
});
