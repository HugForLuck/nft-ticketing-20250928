import { SupportedLocale } from 'apps/portal/src/core/locale/locale.config';

export class InitLocales {
  static readonly type = '[Locale] Init Locales';
}

export class SetActiveLocale {
  static readonly type = '[Locale] Set Active Locale';
  constructor(
    public userLocale: SupportedLocale | null,
    public isBrowser: boolean,
  ) {}
}

export class SetActiveLocaleFromUrl {
  static readonly type = '[Locale] Set Active Locale';
  constructor(public isBorwser: boolean) {}
}

export class SetPreferedLocale {
  static readonly type = '[Locale] Set PreferedLocale';
  constructor(public preferedLocale: SupportedLocale) {}
}

export class RedirectIfPreferedNotActive {
  static readonly type = '[Locale] Set Locale';
}
