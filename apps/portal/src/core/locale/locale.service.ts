import { Injectable } from '@angular/core';
import { defaultLocale, SupportedLocale } from 'apps/portal/src/core/locale/locale.config';
import { getBestBrowserLocale as getBrowserLocale } from 'apps/portal/src/core/locale/locale.utils';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  /**
   * Gets the active locale based on the current URL path.
   * This is the source of truth for what language is currently being displayed.
   * Example: For 'http://domain.com/de-DE/dashboard', it returns 'de-DE'.
   *
   * @returns The supported locale found in the URL, or `null` if the URL
   * does not contain a valid, supported locale segment.
   */
  getActiveLocale(userLocale: SupportedLocale | null, isBrowser: boolean): SupportedLocale {
    if (userLocale) return userLocale;

    if (!isBrowser) {
      // TODO for non browser-based solution (SSR)
      // On the server, we need to rely on the request URL, which is a more
      // complex setup involving the server engine (e.g., Express).
      // For now, we assume this logic is primarily client-driven at bootstrap.
      // A proper SSR setup would inject the request object here.
      return defaultLocale;
    }

    return getBrowserLocale(isBrowser);
  }
}
