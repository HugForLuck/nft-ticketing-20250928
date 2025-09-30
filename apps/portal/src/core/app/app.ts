import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { CookiesState } from 'apps/portal/src/core/cookies/cookies.state';
import { AppLoader } from 'apps/portal/src/shared/app-loader/app-loader';
import { CookiesModal } from '../../shared/cookies-modal/cookies-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookiesModal, AppLoader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  store = inject(Store);

  showCookiesModal = !this.store.selectSnapshot(CookiesState.cookiesAreValid);

  appIsLoading = this.store.selectSignal((state) => state.app.isLoading);
}
