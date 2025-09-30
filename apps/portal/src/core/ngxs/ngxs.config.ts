import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { AppState } from 'apps/portal/src/core/app/app.state';
import { cookiesStateToken } from 'apps/portal/src/core/cookies/cookies.config';
import { CookiesState } from 'apps/portal/src/core/cookies/cookies.state';
import { localeStateToken } from 'apps/portal/src/core/locale/locale.config';
import { LocaleState } from 'apps/portal/src/core/locale/locale.state';

/**
 * Configuration for the NGXS storage plugin.
 * This object defines which parts of the state should be persisted.
 */
export const ngxsStorageConfig: NgxsStoragePluginOptions = {
  /**
   * Specifies which state slices to persist in the browser's local storage.
   * add stateTokens
   */
  keys: [cookiesStateToken, localeStateToken, 'app'],
};

/**
 * An array of all state classes that should be initialized by NGXS.
 */
export const states = [AppState, CookiesState, LocaleState];

// export function withNgxsLoggerPlugin(options?: any) {
//   return makeEnvironmentProviders([
//     withNgxsPlugin(TabSyncPlugin),
//     {
//       provide: NGXS_LOGGER_PLUGIN_OPTIONS,
//       useValue: options,
//     },
//   ]);
// }
