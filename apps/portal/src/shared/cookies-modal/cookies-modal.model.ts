/**
 * @description
 * Definiert die Struktur für die anpassbaren Cookie-Einstellungen.
 * Jede Eigenschaft repräsentiert eine Cookie-Kategorie, die der Nutzer
 * aktivieren oder deaktivieren kann.
 */
export interface CookieSettings {
  /**
   * @description
   * Erlaubt funktionale Cookies, z.B. für den Login-Status.
   */
  functional: boolean;

  /**
   * @description
   * Erlaubt Komfort-Cookies, z.B. für das Speichern des Farbschemas (Theme).
   */
  comfort: boolean;
}
