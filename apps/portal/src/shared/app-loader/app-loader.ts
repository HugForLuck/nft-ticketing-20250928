import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.html',
  styleUrl: './app-loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoader {}
