import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './core/app/app';
import { appConfig } from './core/app/app.config';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
