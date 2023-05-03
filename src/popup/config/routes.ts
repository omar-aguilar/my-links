import type { Location } from 'history';

export type LocationState = {
  backgroundLocation?: Location;
};

type Routes = 'HOME' | 'LINK_NOT_FOUND' | 'UPDATE_LINK' | 'ADD_LINK' | 'DOMAIN_MANAGER';

type RouteConfig = {
  path: string;
  title: string;
  hideInMenu?: boolean;
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
    hideInMenu: true,
  },
  UPDATE_LINK: {
    path: '/update-link',
    title: 'Update Link',
    hideInMenu: true,
  },
  ADD_LINK: {
    path: '/add-link',
    title: 'Add Link',
  },
  DOMAIN_MANAGER: {
    path: '/manage-domains',
    title: 'Manage Domains',
  },
};

export const getRouteConfigByPath = (path: string): RouteConfig | undefined => {
  const route = Object.values(routes).find((value) => value.path === path);
  return route;
};
