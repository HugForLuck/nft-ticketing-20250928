import { SupportedLocale } from 'apps/portal/src/locale/locale.config';

export class SetPreferedLocale {
  static readonly type = '[Locale] Set Locale';
  constructor(public preferedLocale: SupportedLocale) {}
}
