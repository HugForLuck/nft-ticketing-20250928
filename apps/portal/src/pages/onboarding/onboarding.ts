import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { ToggleActiveTheme } from 'apps/portal/src/core/theme/theme.actions';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Onboarding {
  private store = inject(Store);

  toggleTheme() {
    this.store.dispatch(new ToggleActiveTheme());
  }
}
