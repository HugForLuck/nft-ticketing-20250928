import { SupportedLocale } from 'apps/portal/src/locale/locale.config';

export class InitLocales {
  static readonly type = '[Locale] Init Locales';
}

export class SetActiveLocale {
  static readonly type = '[Locale] Set Active Locale';
  constructor(public activeLocale: SupportedLocale) {}
}

export class SetPreferedLocale {
  static readonly type = '[Locale] Set PreferedLocale';
  constructor(public preferedLocale: SupportedLocale) {}
}

export class RedirectIfPreferedNotActive {
  static readonly type = '[Locale] Set Locale';
}
