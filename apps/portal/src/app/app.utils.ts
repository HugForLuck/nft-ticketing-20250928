import { inject, LOCALE_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { hasEmailVerifyPath } from 'apps/portal/src/auth/auth.utils';
import { SetActiveLocale } from 'apps/portal/src/locale/locale.actions';
import { SupportedLocale } from 'apps/portal/src/locale/locale.config';
import { of, tap } from 'rxjs';

export function bootstrapApp() {
  const store = inject(Store);
  const locale = inject(LOCALE_ID) as SupportedLocale;

  const path = window.location.pathname;

  // used to bypass auth check
  if (hasEmailVerifyPath(path)) return of();

  store.dispatch(new SetActiveLocale(locale));
  // store.dispatch(new RedirectIfPreferedNotActive());

  return of('').pipe(tap(hideSplashScreen));
}

function hideSplashScreen(): void {
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

/**
 * Redirects only if selected language by the user is not the same as current language
 * @param langPreference  user's selected language (locale-storage)
 * @param activeLocale active language (by html-tag)
 * @returns false if both are equal else false
 */
// const redirectIfNewLanguage = (store: Store, activeLocale: SupportedLocale) => {
//   const preferedLocaleIsNotActive = store.selectSnapshot(LocaleState.preferedLocaleIsNotActive);
//   const win = document.defaultView;
//   if (!win) return;

//   if (preferedLocaleIsNotActive) {
//     const currentPath = win?.location.pathname;
//     const newUrl = currentPath?.replace(`/${activeLocale}`, `/${langPreference}`);
//     store.dispatch(new SetLocaleId(langPreference));
//     win.location.href = newUrl;
//     return true;
//   }
//   return false;
// };
