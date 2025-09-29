import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { CookiesState } from 'apps/portal/src/core/cookies/cookies.state';
import { CookiesModal } from '../../shared/cookies-modal/cookies-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookiesModal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  store = inject(Store);

  showCookiesModal = !this.store.selectSnapshot(CookiesState.cookiesAreValid);
}
