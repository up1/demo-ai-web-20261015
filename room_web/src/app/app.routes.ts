import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search-rooms/search-rooms.routes').then((m) => m.SEARCH_ROOMS_ROUTES),
  },
  { path: '**', redirectTo: 'search' },
];
