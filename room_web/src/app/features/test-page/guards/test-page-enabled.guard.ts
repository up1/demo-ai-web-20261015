import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { RUNTIME_CONFIG } from '../../../core/config/runtime-config';

export const testPageEnabledGuard: CanMatchFn = () => inject(RUNTIME_CONFIG).testPageEnabled;
