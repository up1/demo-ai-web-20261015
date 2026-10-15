import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  readonly path: string;
  readonly label: string;
}

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly navItems: readonly NavItem[] = [
    { path: '/search', label: 'ค้นหาห้องพัก' },
    { path: '/promotions', label: 'โปรโมชั่นพิเศษ' },
    { path: '/my-bookings', label: 'การจองของฉัน' },
    { path: '/help', label: 'ช่วยเหลือ' },
  ];
}
