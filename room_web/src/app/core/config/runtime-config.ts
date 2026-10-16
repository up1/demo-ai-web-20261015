import { InjectionToken } from '@angular/core';
import { RUNTIME_CONFIG as GENERATED_RUNTIME_CONFIG } from './runtime-config.generated';
import { RuntimeConfig } from './runtime-config.model';

export const RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('RUNTIME_CONFIG', {
  factory: () => GENERATED_RUNTIME_CONFIG,
});
