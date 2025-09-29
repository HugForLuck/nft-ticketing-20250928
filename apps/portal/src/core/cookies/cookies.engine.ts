import { inject, Injectable, Injector } from '@angular/core';
import { StorageEngine } from '@ngxs/storage-plugin';
import { Store } from '@ngxs/store';
import { ESSENTIAL_STATES } from 'apps/portal/src/core/cookies/cookies.config';
import { CookiesState } from 'apps/portal/src/core/cookies/cookies.state';
import { cookieConsented } from 'apps/portal/src/core/cookies/cookies.utils';

/**
 * Eine NGXS Storage Engine, die nur Daten speichert,
 * wenn der Benutzer explizit zugestimmt hat.
 * Dies entkoppelt die Speicherlogik von der Zustimmungslogik.
 */
@Injectable()
export class CookiesStorageEngine implements StorageEngine {
  // Injizieren Sie den Injector anstelle des Stores, um den Zirkelbezug zu durchbrechen.
  private injector = inject(Injector);

  // Wir verwenden einen In-Memory-Fallback, falls keine Zustimmung vorliegt,
  // damit die Anwendung während der Session weiterhin funktioniert, ohne zu persistieren.
  private readonly inMemoryStorage = new Map<string, unknown>();

  /**
   * Gibt die Anzahl der gespeicherten Elemente zurück.
   */
  get length(): number {
    const storage = this.getStorage();
    // Prüfen, ob es sich um den localStorage oder die Map handelt
    if (storage instanceof Map) {
      return storage.size;
    }
    return storage.length;
  }

  /**
   * Liest einen Wert aus dem Speicher.
   * Dies kann immer aus dem localStorage erfolgen, da das Lesen keine Tracking-Implikationen hat.
   */
  getItem(key: string): unknown {
    return localStorage.getItem(key);
  }

  /**
   * Der Kern der Logik: Schreibt einen Wert in den Speicher.
   * Schreibt nur dann in den localStorage, wenn die Zustimmung im ConsentState `true` ist.
   * Andernfalls wird der Wert nur im flüchtigen In-Memory-Speicher gehalten.
   * @param key Der Schlüssel des zu speichernden States.
   * @param val Der zu serialisierende Wert.
   */
  setItem(key: string, val: string): void {
    // Rufen Sie die Store-Instanz bei Bedarf ("lazy") über den Injector ab.
    const store = this.injector.get(Store);

    // Load cookies settings
    const cookies = store.selectSnapshot(CookiesState.allowedCookies);

    // Essential Cookies werden immer in den LocalStorage gespeichert und
    // benötigen keiner Zustimmung
    if (ESSENTIAL_STATES.includes(key)) {
      localStorage.setItem(key, val);
      return;
    }

    if (cookieConsented(cookies, key)) {
      localStorage.setItem(key, val);
    } else {
      // Speichere im Memoryspeicher, wenn der State weder essenziell ist noch eine aktive Erlaubnis vom Nutzer hat.
      this.inMemoryStorage.set(key, val);
    }
  }

  /**
   * Entfernt einen Wert aus dem Speicher.
   * Betrifft beide Speicherorte, um Konsistenz zu gewährleisten.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
    this.inMemoryStorage.delete(key);
  }

  /**
   * Leert den gesamten Speicher.
   * Betrifft beide Speicherorte.
   */
  clear(): void {
    localStorage.clear();
    this.inMemoryStorage.clear();
  }

  /**
   * Gibt den relevanten Speicher (localStorage oder in-memory) basierend auf der Zustimmung zurück.
   * Nützlich für die `length`-Eigenschaft.
   */
  private getStorage(): Storage | Map<string, unknown> {
    // Rufen Sie auch hier die Store-Instanz bei Bedarf ab.
    const store = this.injector.get(Store);
    const hasValidSettings = store.selectSnapshot(CookiesState.cookiesAreValid);
    return hasValidSettings ? localStorage : this.inMemoryStorage;
  }
}
