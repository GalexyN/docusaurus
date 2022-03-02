/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {type Route} from '@generated/routes';
import {findHomePageRoute} from '../routesUtils';

describe('routesUtils findHomePageRoute', () => {
  const homePage: Route = {
    path: '/',
    exact: true,
  };

  test('should return undefined for no routes', () => {
    expect(findHomePageRoute([])).toEqual(undefined);
  });

  test('should return undefined for no homepage', () => {
    expect(
      findHomePageRoute([
        {path: '/a', exact: true},
        {path: '/b', exact: false},
        {path: '/c', exact: undefined},
        {
          path: '/d',
          exact: false,
          routes: [
            {path: '/d/1', exact: true},
            {path: '/d/2', exact: false},
            {path: '/d/3', exact: undefined},
          ],
        },
      ]),
    ).toEqual(undefined);
  });

  test('should find top-level homepage', () => {
    expect(
      findHomePageRoute([
        {path: '/a', exact: true},
        {path: '/b', exact: false},
        {path: '/c', exact: undefined},
        {...homePage, exact: false},
        homePage,
        {...homePage, exact: undefined},
      ]),
    ).toEqual(homePage);
  });

  test('should find nested homepage', () => {
    expect(
      findHomePageRoute([
        {path: '/a', exact: true},
        {
          path: '/',
          exact: false,
          routes: [
            {path: '/b', exact: true},
            {
              path: '/',
              exact: false,
              routes: [{path: '/c', exact: true}, homePage],
            },
          ],
        },
        {path: '/d', exact: true},
      ]),
    ).toEqual(homePage);
  });
});