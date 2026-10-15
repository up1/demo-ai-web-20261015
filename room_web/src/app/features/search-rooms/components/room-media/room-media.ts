import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { BadgeTone, Room } from '../../models/room.model';

@Component({
  selector: 'app-room-media',
  imports: [NgOptimizedImage],
  template: `
    @let current = room();
    <img
      class="image"
      [ngSrc]="current.image.url"
      [alt]="current.image.alt"
      [priority]="priority()"
      fill
      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 100vw"
    />
    @if (current.badge; as badge) {
      <span
        class="badge"
        [class.badge--dark]="badge.tone === BadgeTone.Dark"
        [class.badge--bottom]="current.signature"
      >
        <span class="material-symbols-outlined" aria-hidden="true">{{ badge.icon }}</span>
        {{ badge.label }}
      </span>
    }
    @if (!current.signature) {
      <span class="photo-count">
        <span class="material-symbols-outlined" aria-hidden="true">photo_library</span>
        {{ current.image.count }} รูปภาพ
      </span>
    }
  `,
  styleUrl: './room-media.scss',
})
export class RoomMedia {
  readonly room = input.required<Room>();
  readonly priority = input(false);

  protected readonly BadgeTone = BadgeTone;
}
