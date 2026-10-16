export type TestEnvironmentId = 'dev' | 'qa' | 'sit' | 'uat';

export interface RuntimeConfig {
  readonly testPageEnabled: boolean;
  readonly roomsApiUrls: Readonly<Record<TestEnvironmentId, string>>;
}
