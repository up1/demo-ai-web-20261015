import {
  isSearchCriteriaValid,
  isValidCheckIn,
  isValidCheckOut,
  isValidDestination,
  isValidPriceRange,
  toRoomFilters,
} from './search-validation';
import { DEFAULT_FILTERS, SearchCriteria } from '../models/search-criteria.model';

const TODAY = '2026-10-15';

const validCriteria: SearchCriteria = {
  destinationId: 'phuket',
  checkIn: '2026-10-18',
  checkOut: '2026-10-20',
  adults: 2,
  children: 0,
  rooms: 1,
};

describe('search validation', () => {
  it('accepts only known destinations', () => {
    expect(isValidDestination('phuket')).toBe(true);
    expect(isValidDestination('')).toBe(false);
    expect(isValidDestination('atlantis')).toBe(false);
  });

  it('rejects check-in dates in the past or malformed', () => {
    expect(isValidCheckIn(TODAY, TODAY)).toBe(true);
    expect(isValidCheckIn('2026-10-14', TODAY)).toBe(false);
    expect(isValidCheckIn('2026-02-30', TODAY)).toBe(false);
    expect(isValidCheckIn('', TODAY)).toBe(false);
  });

  it('requires check-out to be after check-in', () => {
    expect(isValidCheckOut('2026-10-18', '2026-10-19')).toBe(true);
    expect(isValidCheckOut('2026-10-18', '2026-10-18')).toBe(false);
    expect(isValidCheckOut('2026-10-18', '2026-10-17')).toBe(false);
  });

  it('requires min price to be less than or equal to max price', () => {
    expect(isValidPriceRange(1500, 15000)).toBe(true);
    expect(isValidPriceRange(5000, 5000)).toBe(true);
    expect(isValidPriceRange(8000, 3000)).toBe(false);
  });

  it('validates the full search criteria', () => {
    expect(isSearchCriteriaValid(validCriteria, TODAY)).toBe(true);
    expect(isSearchCriteriaValid({ ...validCriteria, adults: 0 }, TODAY)).toBe(false);
    expect(isSearchCriteriaValid({ ...validCriteria, children: -1 }, TODAY)).toBe(false);
    expect(isSearchCriteriaValid({ ...validCriteria, rooms: 1.5 }, TODAY)).toBe(false);
  });

  it('restores only well-formed filters from storage', () => {
    expect(toRoomFilters(DEFAULT_FILTERS)).toEqual(DEFAULT_FILTERS);
    expect(toRoomFilters({ ...DEFAULT_FILTERS, roomTypes: ['penthouse'] })).toBeNull();
    expect(toRoomFilters({ ...DEFAULT_FILTERS, bedType: 'bunk' })).toBeNull();
    expect(toRoomFilters({ ...DEFAULT_FILTERS, amenities: ['sauna'] })).toBeNull();
    expect(toRoomFilters('garbage')).toBeNull();
  });
});
