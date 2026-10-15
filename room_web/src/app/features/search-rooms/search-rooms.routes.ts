import { Routes } from '@angular/router';

export const SEARCH_ROOMS_ROUTES: Routes = [
  {
    path: '',
    title: 'ค้นหาห้องพัก | Serene Haven Hotels & Resorts',
    loadComponent: () =>
      import('./components/search-rooms-page/search-rooms-page').then((m) => m.SearchRoomsPage),
  },
];
