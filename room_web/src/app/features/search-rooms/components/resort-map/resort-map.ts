import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Destination } from '../../models/search-criteria.model';

const MAP_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CRwq8idYl_HMULMNxmfuC-oUGFGS8w961c_PPBr5PAKij89rRAbQQDoflnKmrkqH7duhX7LFCwW0F8wYnf0hOMn-RB936YHVxhqNcKfMuqv7KrH8vuOEOGzTuvnTb8nvJ_gp-j4kR0bya02nTafIL8CXs0mnk64_6H1yeSE57Rj-zmFtyjWzRoxK2YBo6U4mHx8-uWQCOXoZDgGdFkZ8Ckm9i5J2PKNcZ9tbtgah';

@Component({
  selector: 'app-resort-map',
  imports: [NgOptimizedImage],
  template: `
    <div class="map">
      <div class="map__header">
        <h3 class="map__title">แผนผังทำเลที่ตั้งรีสอร์ต</h3>
        <span class="map__area">{{ destination().area }}</span>
      </div>
      <a class="map__link" [href]="mapUrl()" target="_blank" rel="noopener noreferrer">
        <img class="map__image" [ngSrc]="imageUrl" fill sizes="(min-width: 1024px) 30vw, 100vw" alt="" />
        <span class="map__overlay">
          <span class="map__cta">
            <span class="material-symbols-outlined" aria-hidden="true">map</span>
            สำรวจแผนที่แบบเต็ม
            <span class="visually-hidden">ของ {{ destination().name }} (เปิดในแท็บใหม่)</span>
          </span>
          <span class="material-symbols-outlined" aria-hidden="true">open_in_new</span>
        </span>
      </a>
    </div>
  `,
  styleUrl: './resort-map.scss',
})
export class ResortMap {
  readonly destination = input.required<Destination>();

  protected readonly imageUrl = MAP_IMAGE_URL;
  protected readonly mapUrl = computed(
    () =>
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.destination().name)}`,
  );
}
