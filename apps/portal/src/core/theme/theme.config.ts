import { StateToken, ɵStoreOptions } from '@ngxs/store/internals';
import { IThemeState } from 'apps/portal/src/core/theme/theme.model';

export type Theme = 'light' | 'dark';

/**
 * Die Standardsprache der Anwendung.
 * Diese wird verwendet, wenn keine passende Sprache ermittelt werden kann
 * oder als Fallback.
 */
export const defaultTheme: Theme = 'light';

/**
 * STATE
 */
export const themeStateDefaults: IThemeState = {
  activeTheme: defaultTheme,
};

export const themeStateToken = new StateToken<IThemeState>('theme');

export const themeStateOptions: ɵStoreOptions<IThemeState> = {
  name: themeStateToken,
  defaults: themeStateDefaults,
};
