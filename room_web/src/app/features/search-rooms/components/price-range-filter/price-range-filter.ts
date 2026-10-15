import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { Room } from '../../models/room.model';
import { PRICE_LIMITS, RoomFilters } from '../../models/search-criteria.model';
import { buildPriceHistogram } from '../../utils/room-query';

const HISTOGRAM_BUCKETS = 8;

@Component({
  selector: 'app-price-range-filter',
  imports: [FormField, DecimalPipe],
  templateUrl: './price-range-filter.html',
  styleUrl: './price-range-filter.scss',
})
export class PriceRangeFilter {
  readonly minPrice = input.required<FieldTree<number>>();
  readonly maxPrice = input.required<FieldTree<number>>();
  readonly filters = input.required<RoomFilters>();
  readonly rooms = input.required<readonly Room[]>();

  protected readonly limits = PRICE_LIMITS;
  protected readonly histogram = computed(() =>
    buildPriceHistogram(this.rooms(), this.filters(), HISTOGRAM_BUCKETS),
  );
  protected readonly isMaxOpenEnded = computed(() => this.filters().maxPrice >= PRICE_LIMITS.max);
  protected readonly error = computed(() => {
    const state = this.maxPrice()();
    return state.invalid() ? (state.errors()[0]?.message ?? null) : null;
  });
}
