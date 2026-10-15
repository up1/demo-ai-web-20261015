import { Amenity, BedType, RoomType, SortOrder } from '../models/room.model';
import { DEFAULT_FILTERS, SearchCriteria } from '../models/search-criteria.model';
import { createRoom } from '../testing/room.fixture';
import { countByRoomType, matchesCriteria, queryRooms } from './room-query';

const cheap = createRoom({ id: 'cheap', pricePerNight: 2000, rating: 4.0, popularity: 60 });
const mid = createRoom({
  id: 'mid',
  pricePerNight: 5000,
  rating: 4.9,
  popularity: 90,
  roomType: RoomType.PoolVilla,
  bedType: BedType.Twin,
  freeCancellation: false,
  amenities: [Amenity.Wifi, Amenity.Tv, Amenity.Fridge, Amenity.AirConditioner],
});
const premium = createRoom({
  id: 'premium',
  pricePerNight: 14000,
  rating: 4.7,
  popularity: 70,
  roomType: RoomType.Grand,
});
const rooms = [cheap, mid, premium];

const ids = (list: readonly { id: string }[]) => list.map((room) => room.id);

describe('room query', () => {
  it('sorts by each sort order', () => {
    expect(ids(queryRooms(rooms, DEFAULT_FILTERS, SortOrder.Popularity))).toEqual(['mid', 'premium', 'cheap']);
    expect(ids(queryRooms(rooms, DEFAULT_FILTERS, SortOrder.PriceLowToHigh))).toEqual(['cheap', 'mid', 'premium']);
    expect(ids(queryRooms(rooms, DEFAULT_FILTERS, SortOrder.PriceHighToLow))).toEqual(['premium', 'mid', 'cheap']);
    expect(ids(queryRooms(rooms, DEFAULT_FILTERS, SortOrder.Rating))).toEqual(['mid', 'premium', 'cheap']);
  });

  it('filters by price range and ignores an invalid range', () => {
    const inRange = queryRooms(rooms, { ...DEFAULT_FILTERS, minPrice: 3000, maxPrice: 6000 }, SortOrder.Popularity);
    expect(ids(inRange)).toEqual(['mid']);

    const invalid = queryRooms(rooms, { ...DEFAULT_FILTERS, minPrice: 9000, maxPrice: 3000 }, SortOrder.Popularity);
    expect(invalid.length).toBe(3);
  });

  it('filters by room type, bed type, amenities and free cancellation', () => {
    const query = (overrides: Partial<typeof DEFAULT_FILTERS>) =>
      ids(queryRooms(rooms, { ...DEFAULT_FILTERS, ...overrides }, SortOrder.PriceLowToHigh));

    expect(query({ roomTypes: [RoomType.Grand, RoomType.PoolVilla] })).toEqual(['mid', 'premium']);
    expect(query({ bedType: BedType.Twin })).toEqual(['mid']);
    expect(query({ amenities: [Amenity.Fridge, Amenity.AirConditioner] })).toEqual(['mid']);
    expect(query({ freeCancellation: true })).toEqual(['cheap', 'premium']);
  });

  it('matches destination, room availability and guest capacity', () => {
    const criteria: SearchCriteria = {
      destinationId: 'phuket',
      checkIn: '2026-10-18',
      checkOut: '2026-10-20',
      adults: 3,
      children: 0,
      rooms: 1,
    };
    expect(matchesCriteria(cheap, criteria)).toBe(false);
    expect(matchesCriteria(cheap, { ...criteria, rooms: 2 })).toBe(true);
    expect(matchesCriteria(cheap, { ...criteria, adults: 2, destinationId: 'samui' })).toBe(false);
  });

  it('counts rooms per room type', () => {
    expect(countByRoomType(rooms)).toEqual({
      [RoomType.Deluxe]: 1,
      [RoomType.PoolVilla]: 1,
      [RoomType.Superior]: 0,
      [RoomType.Grand]: 1,
    });
  });
});
