import { StateToken } from '@ngxs/store';
import { ɵStoreOptions } from '@ngxs/store/internals';
import { ICookiesState } from 'apps/portal/src/core/cookies/cookies.model';

/**
 * Assign Cookies to categories
 */
export const ESSENTIAL_STATES = ['cookies', 'locale', 'app']; // z.B. Cookie-Einstellungen und Sprache
export const FUNCTIONAL_STATES = ['auth']; // z.B. Auth
export const COMFORT_STATES = ['onboarding']; // z.B. Theme-Selektion
export const MARKETING_STATES = [''];
export const ANALYTIC_STATES = [''];

/**
 * State related config
 */
export const cookiesStateDetauls: ICookiesState | null = null;

export const cookiesStateToken = new StateToken<ICookiesState>('cookies');

export const cookiesStateOptions: ɵStoreOptions<ICookiesState | null> = {
  name: cookiesStateToken,
  defaults: cookiesStateDetauls,
};
