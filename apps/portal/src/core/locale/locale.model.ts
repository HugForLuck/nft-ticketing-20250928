import { StateContext } from '@ngxs/store';
import { SupportedLocale } from 'apps/portal/src/core/locale/locale.config';

export interface ILocaleState {
  activeLocale: SupportedLocale;
  preferedLocale: SupportedLocale | null;
}

export type Context = StateContext<ILocaleState>;
