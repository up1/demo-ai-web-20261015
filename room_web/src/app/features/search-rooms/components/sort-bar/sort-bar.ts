import { Component, model } from '@angular/core';
import { SORT_OPTIONS, SortOrder } from '../../models/room.model';

@Component({
  selector: 'app-sort-bar',
  template: `
    <div class="sort" role="group" aria-labelledby="sort-label">
      <span id="sort-label" class="sort__label">จัดเรียงตาม:</span>
      @for (option of options; track option.value) {
        <button
          type="button"
          class="sort__option"
          [class.sort__option--active]="sortOrder() === option.value"
          [attr.aria-pressed]="sortOrder() === option.value"
          (click)="sortOrder.set(option.value)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
  styleUrl: './sort-bar.scss',
})
export class SortBar {
  readonly sortOrder = model.required<SortOrder>();

  protected readonly options = SORT_OPTIONS;
}
