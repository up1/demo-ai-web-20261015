import { Component, input, output } from '@angular/core';
import { Room } from '../../models/room.model';
import { SearchStatus } from '../../models/search-criteria.model';
import { RoomCard } from '../room-card/room-card';

@Component({
  selector: 'app-room-list',
  imports: [RoomCard],
  templateUrl: './room-list.html',
  styleUrl: './room-list.scss',
})
export class RoomList {
  readonly rooms = input.required<readonly Room[]>();
  readonly status = input.required<SearchStatus>();
  readonly errorMessage = input<string | null>(null);
  readonly nights = input.required<number>();
  readonly checkIn = input.required<string>();
  readonly retry = output();
  readonly clearFilters = output();
  readonly selectRoom = output<Room>();

  protected readonly SearchStatus = SearchStatus;
  protected readonly skeletons = [0, 1, 2] as const;
}
