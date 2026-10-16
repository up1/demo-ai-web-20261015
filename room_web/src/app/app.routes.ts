import { Routes } from '@angular/router';
import { testPageEnabledGuard } from './features/test-page/guards/test-page-enabled.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search-rooms/search-rooms.routes').then((m) => m.SEARCH_ROOMS_ROUTES),
  },
  {
    path: 'test_page',
    canMatch: [testPageEnabledGuard],
    loadChildren: () =>
      import('./features/test-page/test-page.routes').then((m) => m.TEST_PAGE_ROUTES),
  },
  { path: '**', redirectTo: 'search' },
];
