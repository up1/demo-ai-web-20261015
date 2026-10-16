import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './shared/components/site-footer/site-footer';
import { TestSessionBanner } from './features/test-page/components/test-session-banner/test-session-banner';
import { SiteHeader } from './shared/components/site-header/site-header';

@Component({
  imports: [RouterOutlet, TestSessionBanner, SiteHeader, SiteFooter],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
