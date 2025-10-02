import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UpdateCookieSettings } from 'apps/portal/src/core/cookies/cookies.action';
import { CookiesState } from 'apps/portal/src/core/cookies/cookies.state';
import { cookieFormConfig } from 'apps/portal/src/shared/cookies-modal/cookies-modal.config';
import { CookieSettings } from 'apps/portal/src/shared/cookies-modal/cookies-modal.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cookies-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cookies-modal.html',
  styleUrls: ['./cookies-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiesModal implements OnInit, OnDestroy {
  private store = inject(Store);
  private readonly fb = inject(FormBuilder);

  public readonly cookies$ = this.store.select(CookiesState.getCookieSettings);

  // Initialisiere das Formular mit Standardwerten (false).
  // Die Werte werden durch den State überschrieben, sobald dieser geladen ist.
  public cookieForm = this.fb.group(cookieFormConfig);

  private readonly destroy$ = new Subject<void>();

  showDetails = signal(false);

  toggleDetails() {
    this.showDetails.set(!this.showDetails());
  }

  /**
   * @description
   * Lädt die aktuellen Cookie-Einstellungen aus dem State und aktualisiert
   * die Formular-Checkboxes entsprechend.
   */
  public ngOnInit(): void {
    this.cookies$.pipe(takeUntil(this.destroy$)).subscribe((currentSettings) => {
      if (currentSettings) {
        const { functional, comfort } = currentSettings;
        this.cookieForm.patchValue(
          { functional, comfort },
          { emitEvent: false }, // Verhindert eine Endlosschleife von valueChanges
        );
      }
    });
  }

  /**
   * @description
   * Akzeptiert alle Cookie-Kategorien (funktional und komfort).
   * Dispatched die entsprechende Action an den NGXS Store.
   */
  public acceptAll(): void {
    const settings = { functional: true, comfort: true };
    this.store.dispatch(new UpdateCookieSettings(settings));
  }

  /**
   * @description
   * Lehnt alle optionalen Cookie-Kategorien ab.
   * Dispatched die entsprechende Action an den NGXS Store.
   */
  public acceptNecessary(): void {
    const settings = { functional: false, comfort: false };
    this.store.dispatch(new UpdateCookieSettings(settings));
  }

  /**
   * @description
   * Speichert die aktuell im Formular ausgewählten Einstellungen.
   * Dispatched die entsprechende Action an den NGXS Store.
   */
  public saveSelection(): void {
    if (this.cookieForm.valid) {
      const formValue = this.cookieForm.getRawValue();
      const settings: CookieSettings = {
        functional: !!formValue.functional,
        comfort: !!formValue.comfort,
      };
      this.store.dispatch(new UpdateCookieSettings(settings));
    }
  }

  /**
   * @description
   * Bereinigt die Subscription, um Memory Leaks zu vermeiden.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
