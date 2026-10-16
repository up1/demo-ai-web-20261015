import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TestSessionService } from '../../services/test-session.service';

@Component({
  selector: 'app-test-session-banner',
  imports: [RouterLink],
  template: `
    @if (testSession.session()) {
      <aside class="banner" aria-label="สถานะการทดสอบ" data-testid="test-session-banner">
        <span class="banner__label">TEST MODE</span>
        <span data-testid="test-session-env">{{ testSession.environment()?.name }}</span>
        <span data-testid="test-session-persona">{{ testSession.persona()?.name }}</span>
        <span data-testid="test-session-feature">{{ testSession.feature()?.name }}</span>
        <a class="banner__link" routerLink="/test_page">เปลี่ยน</a>
        <button
          type="button"
          class="banner__end"
          (click)="testSession.end()"
          data-testid="test-session-end"
        >
          จบการทดสอบ
        </button>
      </aside>
    }
  `,
  styleUrl: './test-session-banner.scss',
})
export class TestSessionBanner {
  protected readonly testSession = inject(TestSessionService);
}
