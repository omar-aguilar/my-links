// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';

export type LocationState = {
  backgroundLocation?: Location;
};

type Routes = 'HOME' | 'LINK_NOT_FOUND';
type RouteConfig = {
  path: string;
  title?: string;
};
export type RoutesConfig = Record<Routes, RouteConfig>;

export const routes: RoutesConfig = {
  HOME: {
    path: '/',
    title: 'Home',
  },
  LINK_NOT_FOUND: {
    path: '/link-not-found',
    title: 'Link Not Found',
  },
};

export const getRouteConfigByPath = (path: string): RouteConfig | undefined => {
  const route = Object.values(routes).find((value) => value.path === path);
  return route;
};
