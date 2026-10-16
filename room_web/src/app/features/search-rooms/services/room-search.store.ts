import { Service, computed, effect, inject, signal } from '@angular/core';
import { Subject, catchError, of, switchMap, tap } from 'rxjs';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { TODAY, addDays, nightsBetween } from '../../../shared/utils/date.utils';
import { Room, SortOrder } from '../models/room.model';
import {
  DEFAULT_FILTERS,
  DESTINATIONS,
  RoomFilters,
  SearchCriteria,
  SearchStatus,
} from '../models/search-criteria.model';
import { countByRoomType, queryRooms } from '../utils/room-query';
import {
  isSearchCriteriaValid,
  isSortOrder,
  toRoomFilters,
  toSearchCriteria,
} from '../utils/search-validation';
import { RoomApiService, RoomSearchError } from './room-api.service';

export const STORAGE_KEYS = {
  criteria: 'search-rooms.criteria',
  filters: 'search-rooms.filters',
  sortOrder: 'search-rooms.sort-order',
  selectedRoom: 'search-rooms.selected-room',
} as const;

@Service()
export class RoomSearchStore {
  private readonly api = inject(RoomApiService);
  private readonly storage = inject(SessionStorageService);
  private readonly today = inject(TODAY);
  private readonly searchRequests = new Subject<SearchCriteria>();

  private readonly results = signal<readonly Room[]>([]);

  readonly criteria = signal(this.restoreCriteria());
  readonly filters = signal(toRoomFilters(this.storage.read(STORAGE_KEYS.filters)) ?? DEFAULT_FILTERS);
  readonly sortOrder = signal(this.restoreSortOrder());
  readonly status = signal(SearchStatus.Idle);
  readonly errorMessage = signal<string | null>(null);
  readonly selectedRoom = signal<Room | null>(null);

  readonly destination = computed(
    () => DESTINATIONS.find((item) => item.id === this.criteria().destinationId) ?? DESTINATIONS[0],
  );
  readonly nights = computed(() => nightsBetween(this.criteria().checkIn, this.criteria().checkOut));
  readonly availableRooms = this.results.asReadonly();
  readonly roomTypeCounts = computed(() => countByRoomType(this.results()));
  readonly visibleRooms = computed(() =>
    queryRooms(this.results(), this.filters(), this.sortOrder()),
  );

  constructor() {
    this.searchRequests
      .pipe(
        tap(() => {
          this.status.set(SearchStatus.Loading);
          this.errorMessage.set(null);
        }),
        switchMap((criteria) =>
          this.api.searchRooms(criteria).pipe(
            tap((rooms) => {
              this.results.set(rooms);
              this.status.set(SearchStatus.Success);
            }),
            catchError((error: unknown) => {
              this.results.set([]);
              this.status.set(SearchStatus.Error);
              this.errorMessage.set(
                error instanceof RoomSearchError ? error.message : 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
              );
              return of(null);
            }),
          ),
        ),
      )
      .subscribe();

    effect(() => this.storage.write(STORAGE_KEYS.criteria, this.criteria()));
    effect(() => this.storage.write(STORAGE_KEYS.filters, this.filters()));
    effect(() => this.storage.write(STORAGE_KEYS.sortOrder, this.sortOrder()));
  }

  search(criteria: SearchCriteria): void {
    this.criteria.set(criteria);
    this.searchRequests.next(criteria);
  }

  retry(): void {
    this.searchRequests.next(this.criteria());
  }

  updateFilters(filters: RoomFilters): void {
    this.filters.set(filters);
  }

  resetFilters(): void {
    this.filters.set(DEFAULT_FILTERS);
  }

  changeSortOrder(sortOrder: SortOrder): void {
    this.sortOrder.set(sortOrder);
  }

  selectRoom(room: Room): void {
    this.selectedRoom.set(room);
    this.storage.write(STORAGE_KEYS.selectedRoom, {
      roomId: room.id,
      criteria: this.criteria(),
    });
  }

  private restoreCriteria(): SearchCriteria {
    const stored = toSearchCriteria(this.storage.read(STORAGE_KEYS.criteria));
    if (stored && isSearchCriteriaValid(stored, this.today)) {
      return stored;
    }
    const checkIn = addDays(this.today, 3);
    return {
      destinationId: DESTINATIONS[0].id,
      checkIn,
      checkOut: addDays(checkIn, 2),
      adults: 2,
      children: 0,
      rooms: 1,
    };
  }

  private restoreSortOrder(): SortOrder {
    const stored = this.storage.read(STORAGE_KEYS.sortOrder);
    return isSortOrder(stored) ? stored : SortOrder.Popularity;
  }
}
