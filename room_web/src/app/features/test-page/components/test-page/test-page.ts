import { Component, computed, inject, signal } from '@angular/core';
import { TestEnvironmentId } from '../../../../core/config/runtime-config.model';
import { TEST_ENVIRONMENTS, TEST_FEATURES, TEST_PERSONAS } from '../../data/test-catalog';
import { TestSessionService } from '../../services/test-session.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.html',
  styleUrl: './test-page.scss',
})
export class TestPage {
  private readonly testSession = inject(TestSessionService);

  protected readonly personas = TEST_PERSONAS;
  protected readonly environments = TEST_ENVIRONMENTS;
  protected readonly features = TEST_FEATURES;

  protected readonly personaId = signal(this.testSession.session()?.personaId ?? '');
  protected readonly environmentId = signal<TestEnvironmentId | ''>(
    this.testSession.session()?.environmentId ?? '',
  );
  protected readonly featureId = signal(this.testSession.session()?.featureId ?? '');

  protected readonly canStart = computed(
    () => this.personaId() !== '' && this.environmentId() !== '' && this.featureId() !== '',
  );

  protected selectEnvironment(id: TestEnvironmentId): void {
    this.environmentId.set(id);
  }

  protected start(event: Event): void {
    event.preventDefault();
    const environmentId = this.environmentId();
    if (!this.canStart() || environmentId === '') {
      return;
    }
    this.testSession.start({
      personaId: this.personaId(),
      environmentId,
      featureId: this.featureId(),
    });
  }
}
