import { DOCUMENT, Service, computed, inject, signal } from '@angular/core';
import { RUNTIME_CONFIG } from '../../../core/config/runtime-config';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { TODAY, addDays } from '../../../shared/utils/date.utils';
import { SearchCriteria } from '../../search-rooms/models/search-criteria.model';
import { STORAGE_KEYS as SEARCH_ROOMS_STORAGE_KEYS } from '../../search-rooms/services/room-search.store';
import { TEST_ENVIRONMENTS, TEST_FEATURES, TEST_PERSONAS } from '../data/test-catalog';
import { TestFeature, TestPersona, TestSession } from '../models/test-session.model';

export const TEST_SESSION_STORAGE_KEY = 'test-page.session';

@Service()
export class TestSessionService {
  private readonly config = inject(RUNTIME_CONFIG);
  private readonly storage = inject(SessionStorageService);
  private readonly document = inject(DOCUMENT);
  private readonly today = inject(TODAY);

  readonly session = signal<TestSession | null>(this.restore());
  readonly persona = computed(() => findById(TEST_PERSONAS, this.session()?.personaId));
  readonly environment = computed(() => findById(TEST_ENVIRONMENTS, this.session()?.environmentId));
  readonly feature = computed(() => findById(TEST_FEATURES, this.session()?.featureId));

  roomsApiUrl(): string | null {
    const session = this.session();
    return session ? this.config.roomsApiUrls[session.environmentId] : null;
  }

  start(session: TestSession): void {
    const persona = findById(TEST_PERSONAS, session.personaId);
    const feature = findById(TEST_FEATURES, session.featureId);
    if (!persona || !feature?.available) {
      return;
    }
    this.seedFeature(feature, persona);
    this.storage.write(TEST_SESSION_STORAGE_KEY, session);
    this.session.set(session);
    this.document.location.assign(feature.route);
  }

  end(): void {
    this.storage.remove(TEST_SESSION_STORAGE_KEY);
    this.session.set(null);
    this.document.location.assign('/test_page');
  }

  private seedFeature(feature: TestFeature, persona: TestPersona): void {
    if (feature.id === 'search-rooms') {
      const checkIn = addDays(this.today, persona.checkInOffsetDays);
      const criteria: SearchCriteria = {
        destinationId: persona.destinationId,
        checkIn,
        checkOut: addDays(checkIn, persona.nights),
        adults: persona.adults,
        children: persona.children,
        rooms: persona.rooms,
      };
      this.storage.write(SEARCH_ROOMS_STORAGE_KEYS.criteria, criteria);
      this.storage.remove(SEARCH_ROOMS_STORAGE_KEYS.filters);
      this.storage.remove(SEARCH_ROOMS_STORAGE_KEYS.sortOrder);
      this.storage.remove(SEARCH_ROOMS_STORAGE_KEYS.selectedRoom);
    }
  }

  private restore(): TestSession | null {
    if (!this.config.testPageEnabled) {
      return null;
    }
    const stored = this.storage.read(TEST_SESSION_STORAGE_KEY);
    return isTestSession(stored) ? stored : null;
  }
}

function findById<T extends { readonly id: string }>(
  items: readonly T[],
  id: string | undefined,
): T | null {
  return items.find((item) => item.id === id) ?? null;
}

function isTestSession(value: unknown): value is TestSession {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const { personaId, environmentId, featureId } = value as Record<string, unknown>;
  return (
    TEST_PERSONAS.some((item) => item.id === personaId) &&
    TEST_ENVIRONMENTS.some((item) => item.id === environmentId) &&
    TEST_FEATURES.some((item) => item.id === featureId)
  );
}
