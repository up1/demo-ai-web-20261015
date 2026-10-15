import { Component, input, model } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  AMENITY_OPTIONS,
  Amenity,
  BED_TYPE_OPTIONS,
  BedType,
  ROOM_TYPE_OPTIONS,
  Room,
  RoomType,
} from '../../models/room.model';
import { DEFAULT_FILTERS, RoomFilters } from '../../models/search-criteria.model';
import { roomFiltersSchema } from '../../utils/search-schemas';
import { PriceRangeFilter } from '../price-range-filter/price-range-filter';

@Component({
  selector: 'app-filter-panel',
  imports: [FormField, PriceRangeFilter],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss',
})
export class FilterPanel {
  readonly filters = model.required<RoomFilters>();
  readonly rooms = input.required<readonly Room[]>();
  readonly roomTypeCounts = input.required<Readonly<Record<RoomType, number>>>();

  protected readonly filtersForm = form(this.filters, roomFiltersSchema);
  protected readonly roomTypeOptions = ROOM_TYPE_OPTIONS;
  protected readonly bedTypeOptions = BED_TYPE_OPTIONS;
  protected readonly amenityOptions = AMENITY_OPTIONS;

  protected isRoomTypeSelected(roomType: RoomType): boolean {
    return this.filters().roomTypes.includes(roomType);
  }

  protected isAmenitySelected(amenity: Amenity): boolean {
    return this.filters().amenities.includes(amenity);
  }

  protected toggleRoomType(roomType: RoomType): void {
    this.filters.update((current) => ({
      ...current,
      roomTypes: toggle(current.roomTypes, roomType),
    }));
  }

  protected toggleAmenity(amenity: Amenity): void {
    this.filters.update((current) => ({
      ...current,
      amenities: toggle(current.amenities, amenity),
    }));
  }

  protected selectBedType(bedType: BedType | null): void {
    this.filters.update((current) => ({ ...current, bedType }));
  }

  protected reset(): void {
    this.filters.set(DEFAULT_FILTERS);
  }
}

function toggle<T>(items: readonly T[], item: T): readonly T[] {
  return items.includes(item) ? items.filter((value) => value !== item) : [...items, item];
}
