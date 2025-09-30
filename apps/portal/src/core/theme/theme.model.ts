import { StateContext } from '@ngxs/store';
import { Theme } from 'apps/portal/src/core/app/app.model';

export interface IThemeState {
  activeTheme: Theme;
}

export type Context = StateContext<IThemeState>;
