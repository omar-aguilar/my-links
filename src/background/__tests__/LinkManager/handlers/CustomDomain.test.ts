import { CustomDomain } from '../../../LinkManager/handlers';

describe('CustomDomain', () => {
  it('handles links within custom domain', () => {
    const mockDomain = 'domain';
    const mockSlug = 'slug-test';
    const expectedRawLink = `${mockDomain}/${mockSlug}`;
    const mockURL = new URL(`http://${mockDomain}/${mockSlug}`);
    const customDomain = CustomDomain(mockDomain);
    expect(customDomain.canHandleURL(mockURL)).toBeTruthy();
    expect(customDomain.getRawLink(mockURL)).toBe(expectedRawLink);
  });
});
