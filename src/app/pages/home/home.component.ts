import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Ristrutturazioni e nuove costruzioni a Bari</h1>
        <p class="hero-tagline">Edilcasa Costruzioni — Cassa Edile Bari dal 2003. Superbonus, sismabonus, pratiche edilizie chiavi in mano.</p>
        <div class="hero-actions">
          <a routerLink="/preventivo" class="btn btn-primary">Preventivo gratuito</a>
          <a routerLink="/portfolio" class="btn btn-secondary">Vedi i nostri lavori</a>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="demo-container">
        <ul class="stats-grid">
          <li class="stat-card">
            <span class="stat-card__num">22</span>
            <span class="stat-card__label">anni di attività</span>
          </li>
          <li class="stat-card">
            <span class="stat-card__num">450+</span>
            <span class="stat-card__label">cantieri completati</span>
          </li>
          <li class="stat-card">
            <span class="stat-card__num">8</span>
            <span class="stat-card__label">tipologie di servizi</span>
          </li>
          <li class="stat-card">
            <span class="stat-card__num">94%</span>
            <span class="stat-card__label">cantieri in orario</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Edilcasa</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">📋</span>
          <h3>Chiavi in mano</h3>
          <p>Gestione completa dal progetto al collaudo. Un unico referente, zero pensieri.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💰</span>
          <h3>Incentivi fiscali</h3>
          <p>Superbonus, ecobonus, sismabonus e cessione del credito gestiti internamente.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔒</span>
          <h3>Garanzia decennale</h3>
          <p>Polizza RC professionale €2M, DURC regolare, garanzia vizi strutturali 10 anni.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🏗️</span>
          <h3>Materiali certificati</h3>
          <p>Solo materiali CE e UNI certificati. Kerakoll, Weber, Caparol, Mapei, Rehau.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredServizi$ | async as servizi">
      <div class="section-header">
        <h2>I nostri servizi principali</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <span class="servizio-card__icon" aria-hidden="true">{{ s.icon }}</span>
          <h3>{{ s.nome }}</h3>
          <p>{{ s.descrizione }}</p>
          <ul class="incentivi-list" *ngIf="s.incentivi && s.incentivi.length">
            <li *ngFor="let inc of s.incentivi" class="badge badge--green">{{ inc }}</li>
          </ul>
        </li>
      </ul>
    </section>

    <section class="featured-projects demo-container" *ngIf="featuredProjects$ | async as progetti">
      <div class="section-header">
        <h2>Ultimi lavori realizzati</h2>
        <a routerLink="/portfolio" class="link-more">Tutto il portfolio →</a>
      </div>
      <ul class="projects-grid">
        <li *ngFor="let p of progetti" class="project-card">
          <div class="project-card__meta">
            <span class="project-card__cat">{{ p.categoria }}</span>
            <span class="project-card__year">{{ p.anno }}</span>
          </div>
          <h3>{{ p.titolo }}</h3>
          <p class="project-card__loc">{{ p.localita }} · {{ p.mq > 0 ? p.mq + ' m²' : '' }}</p>
          <p class="project-card__desc">{{ p.descrizione }}</p>
          <span *ngIf="p.incentivo" class="badge badge--accent">{{ p.incentivo }}</span>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Richiedi il tuo preventivo gratuito</h2>
        <p>Sopralluogo senza impegno. Preventivo dettagliato in 5 giorni lavorativi.</p>
        <div class="hero-actions">
          <a routerLink="/preventivo" class="btn btn-primary">Richiedi preventivo</a>
          <a href="tel:+390805557890" class="btn btn-secondary">Chiama ora</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #fafaf9 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(1.8rem, 5vw, 3rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
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
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .stats {
        background: var(--color-accent);
        padding: 2rem 1rem;
      }
      .stats-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;
        text-align: center;
      }
      .stat-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .stat-card__num {
        font-size: 2.5rem;
        font-weight: 800;
        color: #ffffff;
        line-height: 1;
      }
      .stat-card__label {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.8);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 2rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card__icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .servizio-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .servizio-card p {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.75rem;
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
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--green {
        background: #dafbe1;
        color: var(--color-success);
      }
      .badge--accent {
        background: #e7e5e4;
        color: var(--color-accent);
      }
      .featured-projects {
        padding: 4rem 1rem;
        margin: 0 1rem 2rem;
      }
      .projects-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
      }
      .project-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        background: #ffffff;
      }
      .project-card__meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      .project-card__cat {
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-fg-muted);
      }
      .project-card__year {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-fg-muted);
      }
      .project-card h3 {
        margin: 0 0 0.25rem;
        font-size: 0.95rem;
      }
      .project-card__loc {
        font-size: 0.8rem;
        color: var(--color-accent);
        margin: 0 0 0.5rem;
        font-weight: 600;
      }
      .project-card__desc {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
      }
      .cta-band {
        padding: 5rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredServizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.slice(0, 3))
  );

  readonly featuredProjects$ = this.mockData.portfolio$.pipe(
    map((data) => data.progetti.slice(0, 3))
  );
}
