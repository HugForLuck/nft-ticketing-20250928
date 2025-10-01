import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/onboarding/onboarding').then((m) => m.Onboarding),
  },
];
