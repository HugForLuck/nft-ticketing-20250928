import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Used to contain main content (dashboard, cookies, notifications, etc.), excludes AppLoader screen
 */
@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
  imports: [RouterOutlet],
})
export class AppShell {}
