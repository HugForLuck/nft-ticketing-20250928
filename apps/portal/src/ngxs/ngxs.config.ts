import { NgxsStoragePluginOptions } from '@ngxs/storage-plugin';
import { AppState } from 'apps/portal/src/app/app.state';

/**
 * Configuration for the NGXS storage plugin.
 * This object defines which parts of the state should be persisted.
 */
export const ngxsStorageConfig: NgxsStoragePluginOptions = {
  /**
   * Specifies which state slices to persist in the browser's local storage.
   * add stateTokens
   */
  keys: [],
};

/**
 * An array of all state classes that should be initialized by NGXS.
 */
export const states = [AppState];

// export function withNgxsLoggerPlugin(options?: any) {
//   return makeEnvironmentProviders([
//     withNgxsPlugin(TabSyncPlugin),
//     {
//       provide: NGXS_LOGGER_PLUGIN_OPTIONS,
//       useValue: options,
//     },
//   ]);
// }
