import { TestBed } from '@angular/core/testing';
import { TODAY } from '../../../../shared/utils/date.utils';
import { SearchCriteria, VALIDATION_MESSAGES } from '../../models/search-criteria.model';
import { SearchBar } from './search-bar';

const validCriteria: SearchCriteria = {
  destinationId: 'phuket',
  checkIn: '2026-10-18',
  checkOut: '2026-10-20',
  adults: 2,
  children: 0,
  rooms: 1,
};

async function render(criteria: SearchCriteria) {
  TestBed.configureTestingModule({
    imports: [SearchBar],
    providers: [{ provide: TODAY, useValue: '2026-10-15' }],
  });
  const fixture = TestBed.createComponent(SearchBar);
  fixture.componentRef.setInput('criteria', criteria);
  const emitted: SearchCriteria[] = [];
  fixture.componentInstance.search.subscribe((value) => emitted.push(value));
  await fixture.whenStable();
  return { fixture, emitted, element: fixture.nativeElement as HTMLElement };
}

async function submitForm(fixture: Awaited<ReturnType<typeof render>>['fixture']) {
  const form = (fixture.nativeElement as HTMLElement).querySelector('form');
  form?.dispatchEvent(new Event('submit', { cancelable: true }));
  await fixture.whenStable();
}

describe('SearchBar', () => {
  it('emits the criteria when the form is valid', async () => {
    const { fixture, emitted } = await render(validCriteria);
    await submitForm(fixture);
    expect(emitted).toEqual([validCriteria]);
  });

  it('shows the requirement error messages and does not emit when invalid', async () => {
    const { fixture, emitted, element } = await render({
      ...validCriteria,
      checkIn: '2026-10-01',
      checkOut: '2026-09-30',
      adults: 0,
      rooms: 0,
    });
    await submitForm(fixture);

    const text = element.textContent ?? '';
    expect(emitted).toEqual([]);
    expect(text).toContain(VALIDATION_MESSAGES.checkIn);
    expect(text).toContain(VALIDATION_MESSAGES.checkOut);
    expect(text).toContain(VALIDATION_MESSAGES.guests);
    expect(text).toContain(VALIDATION_MESSAGES.rooms);
    expect(element.querySelector('#check-in')?.getAttribute('aria-invalid')).toBe('true');
  });
});
