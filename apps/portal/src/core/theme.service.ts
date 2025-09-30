import { DOCUMENT, Injectable, Renderer2, RendererFactory2, effect, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ThemeState } from 'apps/portal/src/core/theme.state';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private body = inject(DOCUMENT).body;
  private store = inject(Store);

  // Wandel den State-Selector in ein Signal um
  private activeTheme = this.store.selectSignal(ThemeState.activeTheme);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  /**
   * Verwendet einen `effect`, um auf Änderungen des Themes zu reagieren
   * und das `data-theme`-Attribut auf dem Body zu aktualisieren.
   */
  private initializeTheme(): void {
    effect(() => {
      const theme = this.activeTheme();
      this.renderer.setAttribute(this.body, 'data-theme', theme);
    });
  }
}
