import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-best-rate-card',
  imports: [RouterLink],
  template: `
    <section class="card" aria-labelledby="best-rate-title">
      <span class="card__glow" aria-hidden="true"></span>
      <div class="card__header">
        <span class="card__icon material-symbols-outlined" aria-hidden="true">workspace_premium</span>
        <h3 id="best-rate-title" class="card__title">Serene Haven Official</h3>
      </div>
      <p class="card__text">
        การันตีราคาดีที่สุดเมื่อจองตรงกับเรา พร้อมรับสิทธิพิเศษเช็คเอาท์ล่วงเวลาได้ถึง 14:00 น. และส่วนลดสปา 20%
      </p>
      <a class="card__link" routerLink="/promotions">
        ศึกษารายละเอียดเงื่อนไข
        <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
      </a>
    </section>
  `,
  styleUrl: './best-rate-card.scss',
})
export class BestRateCard {}
