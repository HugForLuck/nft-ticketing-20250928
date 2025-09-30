import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetIsLoading } from 'apps/portal/src/core/app/app.actions';
import { emailVerifyPath } from 'apps/portal/src/core/app/app.config';
import { SetActiveLocale } from 'apps/portal/src/core/locale/locale.actions';
import { of, tap } from 'rxjs';

export function bootstrapApp() {
  const store = inject(Store);
  const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  let userLocale = null;
  // const functionalConsented = store.selectSnapshot(CookiesState.functionalConsented);
  // if (functionalConsented && !isPathEmailVerify()) {
  //   // TODO: login user with firebase (authState)
  //   // TODO: load `dbLocale` fromDB (localeState)
  //   // userLocale = dbLocale;
  // }
  store.dispatch(new SetActiveLocale(userLocale, isBrowser));

  return of('').pipe(
    tap(hideSplashScreen),
    tap(() => store.dispatch(new SetIsLoading(false))),
  );
}

// TODO: only add Splashscreen here, remove everything into appState. So real animated/updating loading screen can be shown
// app-screen-loader can be pushed out and in respectively and animated (are there better visually alternatives?)
export function hideSplashScreen(): void {
  const splashScreen = document.getElementById('app-splash-screen');
  if (splashScreen) {
    // 1. Füge die Fade-Out-Klasse hinzu, um die CSS-Animation zu starten.
    splashScreen.classList.add('fade-out');

    // 2. Entferne das Element nach der Animation vollständig aus dem DOM.
    setTimeout(() => {
      splashScreen.remove();
    }, 500); // Dauer muss mit der CSS-Transitions-Dauer übereinstimmen
  }
}

// TODO: Do I have to bypass it since its on 2. tab
// Is user automatically logged in in 2. tab if logged in in first tab?
/**
 * Used to bypass authentication
 * @returns true if path has `/auth/verify`
 */
function isPathEmailVerify() {
  // TODO: optional: save path elsewhere, reused e.g for redirect to email verification
  return window.location.pathname.includes(emailVerifyPath);
}
