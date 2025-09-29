import { StateToken } from '@ngxs/store';
import { ɵStoreOptions } from '@ngxs/store/internals';
import { ILocaleState } from 'apps/portal/src/locale/locale.model';

/**
 * Definiert die von der Anwendung unterstützten Sprach- und Ländercodes (Locales).
 * Diese Zeichenketten müssen exakt mit den Ordnernamen übereinstimmen,
 * die durch den Angular Build-Prozess für i18n erzeugt werden.
 */
export type SupportedLocale = 'en-US' | 'de-DE' | 'de-AT' | 'de-CH';

/**
 * Die Standardsprache der Anwendung.
 * Diese wird verwendet, wenn keine passende Sprache ermittelt werden kann
 * oder als Fallback.
 */
export const defaultLocale: SupportedLocale = 'en-US';

/**
 * Eine Liste aller von der Anwendung unterstützten Locales.
 * Diese Liste ist die "Single Source of Truth" für alle sprachbezogenen Operationen,
 * wie z.B. die Sprachauswahl-Logik beim App-Start.
 */
export const supportedLocales: SupportedLocale[] = ['en-US', 'de-DE', 'de-AT', 'de-CH'];

/**
 * STATE
 */
export const localeStateDefaults: ILocaleState = {
  preferedLocale: null,
  activeLocale: defaultLocale,
};

export const localeStateToken = new StateToken<ILocaleState>('locale');

export const localeStateOptions: ɵStoreOptions<ILocaleState> = {
  name: localeStateToken,
  defaults: localeStateDefaults,
};
