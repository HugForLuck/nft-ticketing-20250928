import { SupportedLocale, defaultLocale, supportedLocales } from 'apps/portal/src/core/locale/locale.config';

/**
 * Finds the best matching supported locale from the browser's language settings.
 * It iterates through the user's preferred languages (from `navigator.languages`)
 * and returns the first supported match, considering exact and partial matches.
 *
 * @returns The best matching locale or `null` if no match is found.
 */
export function getBestBrowserLocale(isBrowser: boolean): SupportedLocale {
  if (!isBrowser) {
    return defaultLocale; // Cannot determine browser language on the server.
  }

  const browserLanguages = window.navigator.languages; // e.g., ['de-CH', 'de', 'en']

  for (const lang of browserLanguages) {
    // 1. Check for an exact match (e.g., 'de-DE' in browser and is supported)
    if (supportedLocales.includes(lang as SupportedLocale)) {
      return lang as SupportedLocale;
    }

    // 2. Check for a partial match on the base language (e.g., 'de' in browser)
    // This would match the first supported locale starting with 'de-', like 'de-DE'.
    const baseLang = lang.split('-')[0];
    const matchingLocale = supportedLocales.find((sl) => sl.startsWith(baseLang));
    if (matchingLocale) {
      return matchingLocale;
    }
  }

  return defaultLocale;
}

export function getUrlLocale() {
  const path = window.location.pathname; // e.g., "/en-US/dashboard"
  const urlLocale = path.split('/')[1] as SupportedLocale;

  if (supportedLocales.includes(urlLocale)) {
    return urlLocale;
  }

  return defaultLocale;
}
