import { getRouteConfigByPath, routes } from '../../config/routes';

describe('Route Utils', () => {
  describe('getRouteConfigByPath', () => {
    it('get home route config', () => {
      const route = getRouteConfigByPath(routes.HOME.path);
      expect(route).toEqual(routes.HOME);
    });

    it('get not link found route config', () => {
      const route = getRouteConfigByPath(routes.LINK_NOT_FOUND.path);
      expect(route).toEqual(routes.LINK_NOT_FOUND);
    });

    it('get undefined when invalid path', () => {
      const route = getRouteConfigByPath('/link-without-route-config');
      expect(route).toBeUndefined();
    });
  });
});
