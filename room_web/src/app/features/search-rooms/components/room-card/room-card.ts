import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { addDays } from '../../../../shared/utils/date.utils';
import { FeatureTone, Room } from '../../models/room.model';
import { RoomMedia } from '../room-media/room-media';
import { RoomPricing } from '../room-pricing/room-pricing';

const LOW_INVENTORY_THRESHOLD = 3;

@Component({
  selector: 'app-room-card',
  imports: [RoomMedia, RoomPricing, DecimalPipe, DatePipe],
  templateUrl: './room-card.html',
  styleUrl: './room-card.scss',
})
export class RoomCard {
  readonly room = input.required<Room>();
  readonly nights = input.required<number>();
  readonly checkIn = input.required<string>();
  readonly priority = input(false);
  readonly selectRoom = output<Room>();

  protected readonly FeatureTone = FeatureTone;

  protected readonly cancelBy = computed(() => addDays(this.checkIn(), -1));
  protected readonly isLowInventory = computed(
    () => this.room().availableRooms <= LOW_INVENTORY_THRESHOLD,
  );
  protected readonly titleId = computed(() => `room-title-${this.room().id}`);
}
