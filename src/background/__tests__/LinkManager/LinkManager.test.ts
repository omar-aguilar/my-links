import LinkManager from '../../LinkManager';
import { CustomDomain } from '../../LinkManager/handlers';

describe('LinkManager', () => {
  it('returns an invalid link with no handlers', () => {
    const mockURL = new URL('http://test/slug');
    const linkManager = LinkManager([]);

    return linkManager.getLink(mockURL).then((link) => {
      expect(link.isValid()).toBeFalsy();
    });
  });

  it('returns a valid link using a custom domain handler', () => {
    const mockDomain = 'domain';
    const mockSlug = 'slug-test';
    const mockURL = new URL(`http://${mockDomain}/${mockSlug}`);
    const linkManager = LinkManager([CustomDomain(mockDomain)]);
    return linkManager.getLink(mockURL).then((link) => {
      expect(link.isValid()).toBeTruthy();
      expect(link.domain).toBe(mockDomain);
      expect(link.slug).toBe(mockSlug);
    });
  });

  it('returns an empty link when invalid handler', () => {
    const mockDomain = 'domain';
    const mockURL = new URL(`http://random-domain/slug`);
    const linkManager = LinkManager([CustomDomain(mockDomain)]);
    return linkManager.getLink(mockURL).then((link) => {
      expect(link.isValid()).toBeFalsy();
    });
  });
});
