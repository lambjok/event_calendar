import React from 'react';

import Login from '../pages/Login';
import Event from '../pages/Event';
import About from '../pages/About';

export interface IRoute {
  path: string;
  component: React.ComponentType;
}

export enum RouteNames {
  LOGIN = '/login',
  EVENT = '/',
  ABOUT = '/about'
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, component: Login },
  { path: RouteNames.ABOUT, component: About }
]

export const privateRoutes: IRoute[] = [
  { path: RouteNames.EVENT, component: Event },
  { path: RouteNames.ABOUT, component: About }
]