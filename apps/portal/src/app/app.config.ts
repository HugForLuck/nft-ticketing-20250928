import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { ɵStoreOptions } from '@ngxs/store/internals';
import { IAppState } from 'apps/portal/src/app/app.model';
import { bootstrapApp } from 'apps/portal/src/app/app.utils';
import { states } from 'apps/portal/src/ngxs/ngxs.config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => bootstrapApp()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore(
      states,
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsLoggerPlugin(),
      withNgxsRouterPlugin(),
      // withNgxsStoragePlugin(ngxsStorageConfig),
    ),
  ],
};

/**
 * NGXS State Settings
 */
export const appStateDefaults: IAppState = {
  isReady: false,
};

// export const appStateToken = new StateToken<IAppState>('app');

export const appStateOptions: ɵStoreOptions<IAppState> = {
  name: 'app',
  defaults: appStateDefaults,
};
