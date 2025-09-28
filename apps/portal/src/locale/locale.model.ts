import { StateContext } from '@ngxs/store';
import { SupportedLocale } from 'apps/portal/src/locale/locale.config';

export interface ILocaleState {
  preferedLocale: SupportedLocale | null;
}

export type Context = StateContext<ILocaleState | null>;
