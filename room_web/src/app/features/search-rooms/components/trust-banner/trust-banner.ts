import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-banner',
  template: `
    <section class="banner" aria-labelledby="trust-title">
      <div class="banner__main">
        <span class="banner__icon material-symbols-outlined" aria-hidden="true">verified_user</span>
        <div>
          <h2 id="trust-title" class="banner__title">จองตรงกับโรงแรมปลอดภัย 100%</h2>
          <p class="banner__text">ไม่มีค่าธรรมเนียมแอบแฝง ได้รับการยืนยันการจองทันทีผ่าน SMS &amp; อีเมล</p>
        </div>
      </div>
      <ul class="banner__perks">
        @for (perk of perks; track perk) {
          <li>
            <span class="material-symbols-outlined" aria-hidden="true">done</span>
            {{ perk }}
          </li>
        }
      </ul>
    </section>
  `,
  styleUrl: './trust-banner.scss',
})
export class TrustBanner {
  protected readonly perks: readonly string[] = ['ไม่ต้องจ่ายมัดจำล่วงหน้า', 'เปลี่ยนแปลงวันเข้าพักได้'];
}
