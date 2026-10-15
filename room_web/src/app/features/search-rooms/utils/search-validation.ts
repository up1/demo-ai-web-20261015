import { parseIsoDate } from '../../../shared/utils/date.utils';
import { Amenity, BedType, RoomType, SortOrder } from '../models/room.model';
import {
  DESTINATIONS,
  PRICE_LIMITS,
  RoomFilters,
  SearchCriteria,
} from '../models/search-criteria.model';

const ROOM_TYPES: readonly string[] = Object.values(RoomType);
const BED_TYPES: readonly string[] = Object.values(BedType);
const AMENITIES: readonly string[] = Object.values(Amenity);
const SORT_ORDERS: readonly string[] = Object.values(SortOrder);

export function isValidDestination(destinationId: string): boolean {
  return DESTINATIONS.some((destination) => destination.id === destinationId);
}

export function isValidCheckIn(checkIn: string, today: string): boolean {
  return parseIsoDate(checkIn) !== null && checkIn >= today;
}

export function isValidCheckOut(checkIn: string, checkOut: string): boolean {
  return parseIsoDate(checkOut) !== null && parseIsoDate(checkIn) !== null && checkOut > checkIn;
}

export function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

export function isNonNegativeInteger(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

export function isValidPriceRange(minPrice: number, maxPrice: number): boolean {
  return (
    Number.isFinite(minPrice) &&
    Number.isFinite(maxPrice) &&
    minPrice >= PRICE_LIMITS.min &&
    maxPrice <= PRICE_LIMITS.max &&
    minPrice <= maxPrice
  );
}

export function isRoomType(value: unknown): value is RoomType {
  return typeof value === 'string' && ROOM_TYPES.includes(value);
}

export function isBedType(value: unknown): value is BedType {
  return typeof value === 'string' && BED_TYPES.includes(value);
}

export function isAmenity(value: unknown): value is Amenity {
  return typeof value === 'string' && AMENITIES.includes(value);
}

export function isSortOrder(value: unknown): value is SortOrder {
  return typeof value === 'string' && SORT_ORDERS.includes(value);
}

export function isSearchCriteriaValid(criteria: SearchCriteria, today: string): boolean {
  return (
    isValidDestination(criteria.destinationId) &&
    isValidCheckIn(criteria.checkIn, today) &&
    isValidCheckOut(criteria.checkIn, criteria.checkOut) &&
    isPositiveInteger(criteria.adults) &&
    isNonNegativeInteger(criteria.children) &&
    isPositiveInteger(criteria.rooms)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function toSearchCriteria(value: unknown): SearchCriteria | null {
  if (!isRecord(value)) {
    return null;
  }
  const { destinationId, checkIn, checkOut, adults, children, rooms } = value;
  if (
    typeof destinationId !== 'string' ||
    typeof checkIn !== 'string' ||
    typeof checkOut !== 'string' ||
    typeof adults !== 'number' ||
    typeof children !== 'number' ||
    typeof rooms !== 'number'
  ) {
    return null;
  }
  return { destinationId, checkIn, checkOut, adults, children, rooms };
}

export function toRoomFilters(value: unknown): RoomFilters | null {
  if (!isRecord(value)) {
    return null;
  }
  const { minPrice, maxPrice, freeCancellation, roomTypes, bedType, amenities } = value;
  if (
    typeof minPrice !== 'number' ||
    typeof maxPrice !== 'number' ||
    !isValidPriceRange(minPrice, maxPrice) ||
    typeof freeCancellation !== 'boolean' ||
    !Array.isArray(roomTypes) ||
    !roomTypes.every(isRoomType) ||
    (bedType !== null && !isBedType(bedType)) ||
    !Array.isArray(amenities) ||
    !amenities.every(isAmenity)
  ) {
    return null;
  }
  return { minPrice, maxPrice, freeCancellation, roomTypes, bedType, amenities };
}
