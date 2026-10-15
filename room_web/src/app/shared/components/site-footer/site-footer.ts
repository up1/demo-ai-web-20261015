import { Component } from '@angular/core';

interface Branch {
  readonly name: string;
  readonly address: string;
}

@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.scss',
})
export class SiteFooter {
  protected readonly branches: readonly Branch[] = [
    {
      name: 'Serene Haven Phuket Private Oasis',
      address: '88/12 หาดกมลา ต.กมลา อ.กะทู้ จ.ภูเก็ต 83120',
    },
    {
      name: 'Serene Haven Koh Samui Cliffside',
      address: '45 หมู่ 4 อ่าวบ่อผุด ต.บ่อผุด เกาะสมุย จ.สุราษฎร์ธานี 84320',
    },
    {
      name: 'Serene Haven Chiang Mai Sanctuary',
      address: '128 หมู่ 2 ต.แม่แรม อ.แม่ริม จ.เชียงใหม่ 50180',
    },
  ];

  protected readonly services: readonly string[] = [
    'นโยบายการสำรองห้องพัก',
    'บริการรถรับ-ส่งสนามบินส่วนตัว',
    'Serene Haven Wellness & Spa',
    'ห้องอาหารมิชลินไกด์ และบาร์ริมหาด',
    'มาตรการสุขอนามัยและความปลอดภัย',
    'ข้อกำหนดและนโยบายความเป็นส่วนตัว',
  ];

  protected readonly payments: readonly { icon: string; label: string }[] = [
    { icon: 'credit_card', label: 'VISA' },
    { icon: 'credit_card', label: 'Mastercard' },
    { icon: 'account_balance', label: 'PromptPay' },
    { icon: 'shield', label: 'PCI-DSS' },
  ];
}
