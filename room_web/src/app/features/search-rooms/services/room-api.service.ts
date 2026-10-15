import { HttpClient, HttpParams } from '@angular/common/http';
import { InjectionToken, Service, inject } from '@angular/core';
import { Observable, TimeoutError, catchError, map, throwError, timeout } from 'rxjs';
import { Room, RoomSearchResponse } from '../models/room.model';
import { SearchCriteria } from '../models/search-criteria.model';
import { matchesCriteria } from '../utils/room-query';

export const ROOMS_API_URL = new InjectionToken<string>('ROOMS_API_URL', {
  factory: () => 'api/rooms.json',
});

export const REQUEST_TIMEOUT_MS = 3000;

export class RoomSearchError extends Error {}

@Service()
export class RoomApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(ROOMS_API_URL);

  searchRooms(criteria: SearchCriteria): Observable<readonly Room[]> {
    const params = new HttpParams({
      fromObject: {
        destination: criteria.destinationId,
        checkIn: criteria.checkIn,
        checkOut: criteria.checkOut,
        adults: criteria.adults,
        children: criteria.children,
        rooms: criteria.rooms,
      },
    });

    return this.http.get<RoomSearchResponse>(this.apiUrl, { params }).pipe(
      timeout(REQUEST_TIMEOUT_MS),
      map((response) => response.rooms.filter((room) => matchesCriteria(room, criteria))),
      catchError((error: unknown) => throwError(() => new RoomSearchError(toMessage(error)))),
    );
  }
}

function toMessage(error: unknown): string {
  if (error instanceof TimeoutError) {
    return 'ระบบใช้เวลาตอบสนองนานเกินไป กรุณาลองใหม่อีกครั้ง';
  }
  return 'ไม่สามารถโหลดข้อมูลห้องพักได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง';
}
