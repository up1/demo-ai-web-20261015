export enum RoomType {
  Deluxe = 'deluxe',
  PoolVilla = 'pool-villa',
  Superior = 'superior',
  Grand = 'grand',
}

export enum BedType {
  Single = 'single',
  Twin = 'twin',
  King = 'king',
}

export enum Amenity {
  Wifi = 'wifi',
  Tv = 'tv',
  Fridge = 'fridge',
  AirConditioner = 'air-conditioner',
}

export enum SortOrder {
  Popularity = 'popularity',
  PriceLowToHigh = 'price-asc',
  PriceHighToLow = 'price-desc',
  Rating = 'rating',
}

export enum FeatureTone {
  Default = 'default',
  Highlight = 'highlight',
  Positive = 'positive',
}

export enum BadgeTone {
  Dark = 'dark',
  Light = 'light',
}

export interface OptionDefinition<T> {
  readonly value: T;
  readonly label: string;
  readonly icon?: string;
}

export interface RoomFeature {
  readonly icon: string;
  readonly label: string;
  readonly tone?: FeatureTone;
}

export interface RoomBadge {
  readonly icon: string;
  readonly label: string;
  readonly tone: BadgeTone;
}

export interface RoomImage {
  readonly url: string;
  readonly alt: string;
  readonly count: number;
}

export interface Room {
  readonly id: string;
  readonly destinationId: string;
  readonly name: string;
  readonly category: string;
  readonly roomType: RoomType;
  readonly bedType: BedType;
  readonly maxGuests: number;
  readonly availableRooms: number;
  readonly pricePerNight: number;
  readonly originalPrice?: number;
  readonly priceLabel: string;
  readonly freeCancellation: boolean;
  readonly rating: number;
  readonly reviewCount: number;
  readonly popularity: number;
  readonly amenities: readonly Amenity[];
  readonly specs: readonly RoomFeature[];
  readonly features: readonly RoomFeature[];
  readonly image: RoomImage;
  readonly badge?: RoomBadge;
  readonly signature?: boolean;
  readonly memberPerk?: string;
}

export interface RoomSearchResponse {
  readonly rooms: readonly Room[];
}

export const ROOM_TYPE_OPTIONS: readonly OptionDefinition<RoomType>[] = [
  { value: RoomType.Deluxe, label: 'Deluxe' },
  { value: RoomType.PoolVilla, label: 'Pool Villa' },
  { value: RoomType.Superior, label: 'Superior' },
  { value: RoomType.Grand, label: 'Grand' },
];

export const BED_TYPE_OPTIONS: readonly OptionDefinition<BedType>[] = [
  { value: BedType.Single, label: 'เตียงเดี่ยว' },
  { value: BedType.Twin, label: 'เตียงคู่' },
  { value: BedType.King, label: 'เตียงใหญ่' },
];

export const AMENITY_OPTIONS: readonly OptionDefinition<Amenity>[] = [
  { value: Amenity.Wifi, label: 'Wi-Fi', icon: 'wifi' },
  { value: Amenity.Tv, label: 'ทีวี', icon: 'tv' },
  { value: Amenity.Fridge, label: 'ตู้เย็น', icon: 'kitchen' },
  { value: Amenity.AirConditioner, label: 'เครื่องปรับอากาศ', icon: 'ac_unit' },
];

export const SORT_OPTIONS: readonly OptionDefinition<SortOrder>[] = [
  { value: SortOrder.Popularity, label: 'แนะนำยอดนิยม' },
  { value: SortOrder.PriceLowToHigh, label: 'ราคา: ต่ำไปสูง' },
  { value: SortOrder.PriceHighToLow, label: 'ราคา: สูงไปต่ำ' },
  { value: SortOrder.Rating, label: 'คะแนนรีวิวสูงสุด' },
];
