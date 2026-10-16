import { Service } from '@angular/core';

@Service()
export class SessionStorageService {
  read(key: string): unknown {
    try {
      const raw = sessionStorage.getItem(key);
      return raw === null ? null : JSON.parse(raw);
    } catch {
      return null;
    }
  }

  write(key: string, value: unknown): void {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }

  remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch {
      return;
    }
  }
}
