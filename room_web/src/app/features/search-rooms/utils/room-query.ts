import { Room, RoomType, SortOrder } from '../models/room.model';
import { PRICE_LIMITS, RoomFilters, SearchCriteria } from '../models/search-criteria.model';
import { isValidPriceRange } from './search-validation';

export interface PriceBucket {
  readonly heightPercent: number;
  readonly inRange: boolean;
}

export function matchesCriteria(room: Room, criteria: SearchCriteria): boolean {
  const totalGuests = criteria.adults + criteria.children;
  return (
    room.destinationId === criteria.destinationId &&
    room.availableRooms >= criteria.rooms &&
    room.maxGuests * criteria.rooms >= totalGuests
  );
}

export function matchesFilters(room: Room, filters: RoomFilters): boolean {
  const priceRangeApplies = isValidPriceRange(filters.minPrice, filters.maxPrice);
  const withinMax = filters.maxPrice >= PRICE_LIMITS.max || room.pricePerNight <= filters.maxPrice;
  const withinPrice = !priceRangeApplies || (room.pricePerNight >= filters.minPrice && withinMax);
  const matchesRoomType =
    filters.roomTypes.length === 0 || filters.roomTypes.includes(room.roomType);
  const matchesBedType = filters.bedType === null || filters.bedType === room.bedType;
  const matchesAmenities = filters.amenities.every((amenity) => room.amenities.includes(amenity));
  const matchesCancellation = !filters.freeCancellation || room.freeCancellation;
  return (
    withinPrice && matchesRoomType && matchesBedType && matchesAmenities && matchesCancellation
  );
}

const SORT_COMPARATORS: Record<SortOrder, (a: Room, b: Room) => number> = {
  [SortOrder.Popularity]: (a, b) => b.popularity - a.popularity,
  [SortOrder.PriceLowToHigh]: (a, b) => a.pricePerNight - b.pricePerNight,
  [SortOrder.PriceHighToLow]: (a, b) => b.pricePerNight - a.pricePerNight,
  [SortOrder.Rating]: (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
};

export function queryRooms(
  rooms: readonly Room[],
  filters: RoomFilters,
  sortOrder: SortOrder,
): readonly Room[] {
  return rooms.filter((room) => matchesFilters(room, filters)).sort(SORT_COMPARATORS[sortOrder]);
}

export function countByRoomType(rooms: readonly Room[]): Readonly<Record<RoomType, number>> {
  const counts: Record<RoomType, number> = {
    [RoomType.Deluxe]: 0,
    [RoomType.PoolVilla]: 0,
    [RoomType.Superior]: 0,
    [RoomType.Grand]: 0,
  };
  for (const room of rooms) {
    counts[room.roomType] += 1;
  }
  return counts;
}

export function buildPriceHistogram(
  rooms: readonly Room[],
  filters: RoomFilters,
  bucketCount: number,
): readonly PriceBucket[] {
  const span = (PRICE_LIMITS.max - PRICE_LIMITS.min) / bucketCount;
  const counts = Array.from({ length: bucketCount }, () => 0);
  for (const room of rooms) {
    const index = Math.floor((room.pricePerNight - PRICE_LIMITS.min) / span);
    counts[Math.min(bucketCount - 1, Math.max(0, index))] += 1;
  }
  const highest = Math.max(1, ...counts);
  return counts.map((count, index) => {
    const bucketStart = PRICE_LIMITS.min + index * span;
    const bucketEnd = bucketStart + span;
    return {
      heightPercent: Math.max(12, Math.round((count / highest) * 100)),
      inRange: bucketEnd > filters.minPrice && bucketStart < filters.maxPrice,
    };
  });
}
