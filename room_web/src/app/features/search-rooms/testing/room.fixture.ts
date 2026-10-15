import { Amenity, BedType, Room, RoomType } from '../models/room.model';

export function createRoom(overrides: Partial<Room> = {}): Room {
  return {
    id: 'room-1',
    destinationId: 'phuket',
    name: 'Test Room',
    category: 'Test',
    roomType: RoomType.Deluxe,
    bedType: BedType.King,
    maxGuests: 2,
    availableRooms: 5,
    pricePerNight: 3000,
    priceLabel: 'ราคาต่อคืน',
    freeCancellation: true,
    rating: 4.5,
    reviewCount: 100,
    popularity: 50,
    amenities: [Amenity.Wifi, Amenity.Tv],
    specs: [],
    features: [],
    image: { url: 'https://example.com/room.jpg', alt: 'room', count: 1 },
    ...overrides,
  };
}
