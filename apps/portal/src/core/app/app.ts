import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { SetIsLoading } from 'apps/portal/src/core/app/app.actions';
import { CookiesState } from 'apps/portal/src/core/cookies/cookies.state';
import { ToggleActiveTheme } from 'apps/portal/src/core/theme/theme.actions';
import { AppLoader } from 'apps/portal/src/shared/app-loader/app-loader';
import { tap, timer } from 'rxjs';
import { CookiesModal } from '../../shared/cookies-modal/cookies-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookiesModal, AppLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  store = inject(Store);

  ngOnInit() {
    timer(2000)
      .pipe(tap(() => this.store.dispatch(new SetIsLoading(false))))
      .subscribe();
  }

  showCookiesModal = !this.store.selectSnapshot(CookiesState.cookiesAreValid);

  appIsLoading = this.store.selectSignal((state) => state.app.isLoading);

  toggleTheme() {
    this.store.dispatch(new ToggleActiveTheme());
  }
}
