import { Routes } from '@angular/router';

export const TEST_PAGE_ROUTES: Routes = [
  {
    path: '',
    title: 'Test Page | Serene Haven Hotels & Resorts',
    loadComponent: () => import('./components/test-page/test-page').then((m) => m.TestPage),
  },
];
