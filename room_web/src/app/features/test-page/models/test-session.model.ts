import { TestEnvironmentId } from '../../../core/config/runtime-config.model';

export interface TestPersona {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly destinationId: string;
  readonly checkInOffsetDays: number;
  readonly nights: number;
  readonly adults: number;
  readonly children: number;
  readonly rooms: number;
}

export interface TestEnvironment {
  readonly id: TestEnvironmentId;
  readonly name: string;
  readonly description: string;
}

export interface TestFeature {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly route: string;
  readonly available: boolean;
}

export interface TestSession {
  readonly personaId: string;
  readonly environmentId: TestEnvironmentId;
  readonly featureId: string;
}
