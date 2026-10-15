import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SearchCriteria } from '../models/search-criteria.model';
import { createRoom } from '../testing/room.fixture';
import { REQUEST_TIMEOUT_MS, ROOMS_API_URL, RoomApiService, RoomSearchError } from './room-api.service';

const criteria: SearchCriteria = {
  destinationId: 'phuket',
  checkIn: '2026-10-18',
  checkOut: '2026-10-20',
  adults: 2,
  children: 0,
  rooms: 1,
};

describe('RoomApiService', () => {
  let service: RoomApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ROOMS_API_URL, useValue: '/api/rooms' },
      ],
    });
    service = TestBed.inject(RoomApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    vi.useRealTimers();
    http.verify();
  });

  it('sends the criteria as query params and keeps rooms matching the destination', () => {
    let result: readonly string[] = [];
    service.searchRooms(criteria).subscribe((rooms) => (result = rooms.map((room) => room.id)));

    const request = http.expectOne((req) => req.url === '/api/rooms');
    expect(request.request.params.get('destination')).toBe('phuket');
    expect(request.request.params.get('checkIn')).toBe('2026-10-18');
    expect(request.request.params.get('adults')).toBe('2');
    request.flush({
      rooms: [createRoom({ id: 'a' }), createRoom({ id: 'b', destinationId: 'samui' })],
    });

    expect(result).toEqual(['a']);
  });

  it('maps server errors to a RoomSearchError', () => {
    let error: unknown;
    service.searchRooms(criteria).subscribe({ error: (err: unknown) => (error = err) });

    http.expectOne((req) => req.url === '/api/rooms').flush('boom', { status: 500, statusText: 'Server Error' });

    expect(error).toBeInstanceOf(RoomSearchError);
  });

  it('fails with a timeout message after 3 seconds', () => {
    vi.useFakeTimers();
    let error: unknown;
    service.searchRooms(criteria).subscribe({ error: (err: unknown) => (error = err) });

    const request = http.expectOne((req) => req.url === '/api/rooms');
    vi.advanceTimersByTime(REQUEST_TIMEOUT_MS);

    expect(request.cancelled).toBe(true);
    expect(error).toBeInstanceOf(RoomSearchError);
    expect((error as RoomSearchError).message).toContain('นานเกินไป');
  });
});
