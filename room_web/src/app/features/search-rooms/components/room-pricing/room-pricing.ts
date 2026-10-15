import { DecimalPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-pricing',
  imports: [DecimalPipe],
  template: `
    @let current = room();
    <div class="amounts">
      @if (current.originalPrice) {
        <span class="label original">
          <span class="visually-hidden">ราคาปกติ</span>
          ฿{{ current.originalPrice | number }}
        </span>
      } @else {
        <span class="label">{{ current.priceLabel }}</span>
      }
      <p class="nightly">
        <span class="value">฿{{ current.pricePerNight | number }}</span>
        <span class="unit">/ คืน</span>
      </p>
      @if (nights() > 0) {
        <span class="label">ราคารวมภาษี {{ nights() }} คืน: ฿{{ totalPrice() | number }}</span>
      }
    </div>
    <button
      type="button"
      class="cta"
      [class.cta--accent]="current.signature"
      [attr.aria-describedby]="describedBy()"
      (click)="selectRoom.emit()"
    >
      เลือกจองห้องนี้
      <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
    </button>
  `,
  styleUrl: './room-pricing.scss',
})
export class RoomPricing {
  readonly room = input.required<Room>();
  readonly nights = input.required<number>();
  readonly describedBy = input<string | null>(null);
  readonly selectRoom = output();

  protected readonly totalPrice = computed(() => this.room().pricePerNight * this.nights());
}
