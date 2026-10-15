import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoomSearchStore } from '../../services/room-search.store';
import { BestRateCard } from '../best-rate-card/best-rate-card';
import { FilterPanel } from '../filter-panel/filter-panel';
import { ResortMap } from '../resort-map/resort-map';
import { RoomList } from '../room-list/room-list';
import { SearchBar } from '../search-bar/search-bar';
import { SortBar } from '../sort-bar/sort-bar';
import { TrustBanner } from '../trust-banner/trust-banner';

@Component({
  selector: 'app-search-rooms-page',
  imports: [RouterLink, SearchBar, SortBar, FilterPanel, ResortMap, BestRateCard, RoomList, TrustBanner],
  templateUrl: './search-rooms-page.html',
  styleUrl: './search-rooms-page.scss',
})
export class SearchRoomsPage {
  protected readonly store = inject(RoomSearchStore);

  constructor() {
    this.store.search(this.store.criteria());
  }
}
