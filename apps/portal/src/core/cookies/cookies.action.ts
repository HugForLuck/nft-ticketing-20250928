export class UpdateCookieSettings {
  static readonly type = '[Cookies] Update Cookie Settings';
  constructor(public settings: { functional: boolean; comfort: boolean }) {}
}
