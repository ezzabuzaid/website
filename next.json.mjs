'use strict';

import _siteNavigation from './navigation.json' with { type: 'json' };
import _siteRedirects from './redirects.json' with { type: 'json' };
import _siteConfig from './site.json' with { type: 'json' };

/** @type {import('./types').SiteNavigation} */
export const siteNavigation = _siteNavigation;

/** @type {Record<string, Array<import('./types').Redirect>>} */
export const siteRedirects = _siteRedirects;

/** @type {import('./types').SiteConfig} */
export const siteConfig = _siteConfig;
