import { Amenity, BedType, RoomType, SortOrder } from './room.model';

export interface Destination {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly area: string;
}

export interface SearchCriteria {
  readonly destinationId: string;
  readonly checkIn: string;
  readonly checkOut: string;
  readonly adults: number;
  readonly children: number;
  readonly rooms: number;
}

export interface RoomFilters {
  readonly minPrice: number;
  readonly maxPrice: number;
  readonly freeCancellation: boolean;
  readonly roomTypes: readonly RoomType[];
  readonly bedType: BedType | null;
  readonly amenities: readonly Amenity[];
}

export interface SearchState {
  readonly criteria: SearchCriteria;
  readonly filters: RoomFilters;
  readonly sortOrder: SortOrder;
}

export enum SearchStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export const PRICE_LIMITS = {
  min: 1500,
  max: 15000,
  step: 500,
} as const;

export const DESTINATIONS: readonly Destination[] = [
  {
    id: 'phuket',
    name: 'Serene Haven Phuket Beachfront Resort',
    shortName: 'รีสอร์ตภูเก็ต',
    area: 'หาดกมลา ภูเก็ต',
  },
  {
    id: 'samui',
    name: 'Serene Haven Koh Samui Cliffside',
    shortName: 'รีสอร์ตเกาะสมุย',
    area: 'อ่าวบ่อผุด เกาะสมุย',
  },
  {
    id: 'chiangmai',
    name: 'Serene Haven Chiang Mai Sanctuary',
    shortName: 'รีสอร์ตเชียงใหม่',
    area: 'แม่ริม เชียงใหม่',
  },
];

export const DEFAULT_FILTERS: RoomFilters = {
  minPrice: PRICE_LIMITS.min,
  maxPrice: PRICE_LIMITS.max,
  freeCancellation: false,
  roomTypes: [],
  bedType: null,
  amenities: [],
};

export const VALIDATION_MESSAGES = {
  destination: 'Please enter a valid location',
  checkIn: 'Please enter a valid check-in date',
  checkOut: 'Please enter a valid check-out date',
  guests: 'Please enter a valid number of guests',
  rooms: 'Please enter a valid number of rooms',
  priceRange: 'Please enter a valid price range',
  freeCancellation: 'Please select a valid option for free cancellation',
  roomType: 'Please select a valid room type',
  bedType: 'Please select a valid bed type',
  amenities: 'Please select valid amenities',
  sortOrder: 'Please select a valid sort order',
} as const;
