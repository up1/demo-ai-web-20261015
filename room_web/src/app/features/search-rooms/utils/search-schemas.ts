import { SchemaPathTree, max, min, required, validate } from '@angular/forms/signals';
import {
  PRICE_LIMITS,
  RoomFilters,
  SearchCriteria,
  VALIDATION_MESSAGES,
} from '../models/search-criteria.model';
import {
  isNonNegativeInteger,
  isPositiveInteger,
  isValidCheckIn,
  isValidCheckOut,
  isValidDestination,
  isValidPriceRange,
} from './search-validation';

export function searchCriteriaSchema(today: string) {
  return (path: SchemaPathTree<SearchCriteria>) => {
    required(path.destinationId, { message: VALIDATION_MESSAGES.destination });
    validate(path.destinationId, ({ value }) =>
      isValidDestination(value())
        ? null
        : { kind: 'destination', message: VALIDATION_MESSAGES.destination },
    );

    required(path.checkIn, { message: VALIDATION_MESSAGES.checkIn });
    validate(path.checkIn, ({ value }) =>
      isValidCheckIn(value(), today)
        ? null
        : { kind: 'checkIn', message: VALIDATION_MESSAGES.checkIn },
    );

    required(path.checkOut, { message: VALIDATION_MESSAGES.checkOut });
    validate(path.checkOut, ({ value, valueOf }) =>
      isValidCheckOut(valueOf(path.checkIn), value())
        ? null
        : { kind: 'checkOut', message: VALIDATION_MESSAGES.checkOut },
    );

    min(path.adults, 1, { message: VALIDATION_MESSAGES.guests });
    min(path.children, 0, { message: VALIDATION_MESSAGES.guests });
    min(path.rooms, 1, { message: VALIDATION_MESSAGES.rooms });
    validate(path.adults, ({ value }) =>
      isPositiveInteger(value()) ? null : { kind: 'guests', message: VALIDATION_MESSAGES.guests },
    );
    validate(path.children, ({ value }) =>
      isNonNegativeInteger(value())
        ? null
        : { kind: 'guests', message: VALIDATION_MESSAGES.guests },
    );
    validate(path.rooms, ({ value }) =>
      isPositiveInteger(value()) ? null : { kind: 'rooms', message: VALIDATION_MESSAGES.rooms },
    );
  };
}

export function roomFiltersSchema(path: SchemaPathTree<RoomFilters>) {
  min(path.minPrice, PRICE_LIMITS.min, { message: VALIDATION_MESSAGES.priceRange });
  max(path.minPrice, PRICE_LIMITS.max, { message: VALIDATION_MESSAGES.priceRange });
  min(path.maxPrice, PRICE_LIMITS.min, { message: VALIDATION_MESSAGES.priceRange });
  max(path.maxPrice, PRICE_LIMITS.max, { message: VALIDATION_MESSAGES.priceRange });
  validate(path.maxPrice, ({ value, valueOf }) =>
    isValidPriceRange(valueOf(path.minPrice), value())
      ? null
      : { kind: 'priceRange', message: VALIDATION_MESSAGES.priceRange },
  );
}
