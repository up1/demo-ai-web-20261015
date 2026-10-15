import { InjectionToken } from '@angular/core';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 86_400_000;

export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(value: string): Date | null {
  if (!ISO_DATE_PATTERN.test(value)) {
    return null;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const isSameDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return isSameDate ? date : null;
}

export function addDays(isoDate: string, days: number): string {
  const date = parseIsoDate(isoDate);
  if (!date) {
    return isoDate;
  }
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = parseIsoDate(checkIn);
  const end = parseIsoDate(checkOut);
  if (!start || !end) {
    return 0;
  }
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / MS_PER_DAY));
}

export const TODAY = new InjectionToken<string>('TODAY', {
  factory: () => toIsoDate(new Date()),
});
