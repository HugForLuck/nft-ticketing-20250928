import { StateContext } from '@ngxs/store';

export type CookiesType = 'functional' | 'comfort';

export interface ICookiesConsent extends Record<CookiesType, boolean> {}

export interface ICookiesState extends ICookiesConsent {}

export type Context = StateContext<ICookiesState>;
