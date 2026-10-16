import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeTh from '@angular/common/locales/th';
import {
  ApplicationConfig,
  LOCALE_ID,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ROOMS_API_URL } from './features/search-rooms/services/room-api.service';
import { TestSessionService } from './features/test-page/services/test-session.service';

registerLocaleData(localeTh);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'th' },
    {
      provide: ROOMS_API_URL,
      useFactory: () => inject(TestSessionService).roomsApiUrl() ?? 'api/rooms.json',
    },
  ]
};
