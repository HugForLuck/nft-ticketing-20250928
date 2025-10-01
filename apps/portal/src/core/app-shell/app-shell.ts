import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookiesModal } from '../../shared/cookies-modal/cookies-modal';

/**
 * Used to contain main content (dashboard, cookies, notifications, etc.), excludes AppLoader screen
 */
@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
  imports: [RouterOutlet, CookiesModal],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {}
