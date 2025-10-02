import { StateContext } from '@ngxs/store';
import { Theme } from 'apps/portal/src/core/theme/theme.config';

export interface IThemeState {
  activeTheme: Theme;
}

export type Context = StateContext<IThemeState>;
