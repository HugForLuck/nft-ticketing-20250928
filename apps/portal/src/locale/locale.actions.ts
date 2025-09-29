import { SupportedLocale } from 'apps/portal/src/locale/locale.config';

export class SetActiveLocale {
  static readonly type = '[Locale] Set Locale';
  constructor(public activeLocale: SupportedLocale) {}
}

export class SetPreferedLocale {
  static readonly type = '[Locale] Set Locale';
  constructor(public preferedLocale: SupportedLocale) {}
}

export class RedirectIfPreferedNotActive {
  static readonly type = '[Locale] Set Locale';
}
