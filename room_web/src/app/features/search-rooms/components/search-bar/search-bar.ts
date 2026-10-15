import { Component, ElementRef, computed, inject, input, linkedSignal, output, signal, viewChild } from '@angular/core';
import { FieldTree, FormField, form, submit } from '@angular/forms/signals';
import { TODAY, nightsBetween } from '../../../../shared/utils/date.utils';
import { DESTINATIONS, SearchCriteria } from '../../models/search-criteria.model';
import { searchCriteriaSchema } from '../../utils/search-schemas';

@Component({
  selector: 'app-search-bar',
  imports: [FormField],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  readonly criteria = input.required<SearchCriteria>();
  readonly searchSubmit = output<SearchCriteria>();

  protected readonly today = inject(TODAY);
  protected readonly destinations = DESTINATIONS;
  protected readonly model = linkedSignal(() => ({ ...this.criteria() }));
  protected readonly searchForm = form(this.model, searchCriteriaSchema(this.today));
  protected readonly guestsOpen = signal(false);
  protected readonly nights = computed(() => nightsBetween(this.model().checkIn, this.model().checkOut));
  protected readonly guestsInvalid = computed(
    () =>
      this.isShowingError(this.searchForm.adults) ||
      this.isShowingError(this.searchForm.children) ||
      this.isShowingError(this.searchForm.rooms),
  );

  private readonly guestsToggle = viewChild.required<ElementRef<HTMLButtonElement>>('guestsToggle');

  protected errorOf<T>(field: FieldTree<T>): string | null {
    const state = field();
    return state.touched() && state.invalid() ? (state.errors()[0]?.message ?? null) : null;
  }

  protected toggleGuests(): void {
    this.guestsOpen.update((open) => !open);
  }

  protected closeGuests(restoreFocus: boolean): void {
    this.guestsOpen.set(false);
    if (restoreFocus) {
      this.guestsToggle().nativeElement.focus();
    }
  }

  protected onGuestsFocusOut(event: FocusEvent, container: HTMLElement): void {
    const next = event.relatedTarget;
    if (next instanceof Node && container.contains(next)) {
      return;
    }
    this.guestsOpen.set(false);
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const valid = await submit(this.searchForm, async () => {
      this.searchSubmit.emit(this.model());
      return undefined;
    });
    if (!valid && this.guestsInvalid()) {
      this.guestsOpen.set(true);
    }
  }

  private isShowingError<T>(field: FieldTree<T>): boolean {
    return this.errorOf(field) !== null;
  }
}
