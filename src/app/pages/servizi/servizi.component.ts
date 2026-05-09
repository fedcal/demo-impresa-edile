import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri servizi</h1>
        <p>Ristrutturazioni complete, impianti, fotovoltaico e pratiche edilizie a Bari e provincia.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="servizi$ | async as data">
      <ul class="servizi-list">
        <li *ngFor="let s of data.servizi" class="servizio-item" [id]="s.id">
          <div class="servizio-item__head">
            <span class="servizio-item__icon" aria-hidden="true">{{ s.icon }}</span>
            <div>
              <h2>{{ s.nome }}</h2>
              <p class="servizio-item__desc">{{ s.descrizione }}</p>
            </div>
          </div>
          <ul class="dettagli-grid">
            <li *ngFor="let d of s.dettagli">{{ d }}</li>
          </ul>
          <div class="incentivi-row" *ngIf="s.incentivi && s.incentivi.length">
            <span class="incentivi-label">Incentivi applicabili:</span>
            <ul class="incentivi-list">
              <li *ngFor="let inc of s.incentivi" class="badge badge--green">{{ inc }}</li>
            </ul>
          </div>
        </li>
      </ul>

      <div class="cta-inline">
        <h3>Hai un progetto in mente?</h3>
        <p>Il sopralluogo e il preventivo sono gratuiti. Rispondiamo in 24h lavorative.</p>
        <a routerLink="/preventivo" class="btn btn-primary">Richiedi preventivo gratuito</a>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
      }
      .servizio-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        background: #ffffff;
      }
      .servizio-item__head {
        display: flex;
        gap: 1.5rem;
        align-items: flex-start;
        margin-bottom: 1.5rem;
      }
      .servizio-item__icon {
        font-size: 2.5rem;
        flex-shrink: 0;
        line-height: 1;
        margin-top: 0.25rem;
      }
      .servizio-item__head h2 {
        margin: 0 0 0.5rem;
        font-size: 1.3rem;
      }
      .servizio-item__desc {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
      }
      .dettagli-grid {
        list-style: none;
        padding: 0;
        margin: 0 0 1.25rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 0.5rem;
      }
      .dettagli-grid li {
        font-size: 0.9rem;
        padding: 0.4rem 0.6rem 0.4rem 1.4rem;
        position: relative;
        color: var(--color-fg-default);
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
      }
      .dettagli-grid li::before {
        content: '✓';
        position: absolute;
        left: 0.5rem;
        color: var(--color-success);
        font-weight: 700;
      }
      .incentivi-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .incentivi-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .incentivi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
      }
      .badge {
        font-size: 0.75rem;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--green {
        background: #dafbe1;
        color: var(--color-success);
      }
      .cta-inline {
        margin-top: 3rem;
        padding: 2.5rem;
        background: var(--color-fg-default);
        border-radius: var(--radius-lg);
        text-align: center;
        color: #ffffff;
      }
      .cta-inline h3 {
        margin: 0 0 0.5rem;
        color: #ffffff;
        font-size: 1.4rem;
      }
      .cta-inline p {
        color: rgba(255, 255, 255, 0.8);
        margin: 0 0 1.5rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: var(--color-accent-dark);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly servizi$ = this.mockData.servizi$;
}
