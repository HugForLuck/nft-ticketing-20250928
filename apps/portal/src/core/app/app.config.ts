import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { STORAGE_ENGINE, withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { ɵStoreOptions } from '@ngxs/store/internals';
import { IAppState } from 'apps/portal/src/core/app/app.model';
import { CookiesStorageEngine } from 'apps/portal/src/core/cookies/cookies.engine';
import { ngxsStorageConfig, states } from 'apps/portal/src/core/ngxs/ngxs.config';
import { routes } from '../../shared/app-shell/app-shell.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideAppInitializer(hideSplashScreen),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore(
      states,
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      withNgxsLoggerPlugin(),
      withNgxsRouterPlugin(),
      withNgxsStoragePlugin(ngxsStorageConfig),
    ),
    {
      provide: STORAGE_ENGINE,
      useClass: CookiesStorageEngine,
    },
  ],
};

export const emailVerifyPath = '/auth/verify';

/**
 * NGXS State Settings
 */
export const appStateDefaults: IAppState = {
  isLoading: true,
  theme: 'dark',
};

// export const appStateToken = new StateToken<IAppState>('app');

export const appStateOptions: ɵStoreOptions<IAppState> = {
  name: 'app',
  defaults: appStateDefaults,
};
