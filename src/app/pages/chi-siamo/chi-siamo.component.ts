import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Impresa edile barese dal 2003. Professionalità, garanzie e rapporto diretto con il cliente.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="vm$ | async as vm">
      <section class="story">
        <h2>La storia di Edilcasa</h2>
        <p>
          Edilcasa Costruzioni nasce nel 2003 dall'ingegnere Francesco Laterza, dopo tre anni di formazione
          in studi professionali specializzati in consolidamento strutturale. Partita come ditta individuale
          con due operai, oggi è una società con 12 collaboratori fissi, tre squadre operative indipendenti
          e oltre 450 cantieri completati in Puglia.
        </p>
        <p>
          La filosofia è semplice: un unico interlocutore per l'intero cantiere, materiali certificati,
          cronoprogramma rispettato. Ogni commessa è affiancata da un direttore lavori dedicato che
          risponde personalmente al cliente dal primo sopralluogo al collaudo finale.
        </p>
        <p>
          Siamo iscritti alla Cassa Edile di Bari (cod. AE 07124), copriamo tutta la provincia BAT
          e gestiamo internamente le pratiche urbanistiche e gli incentivi fiscali (Superbonus,
          sismabonus, ecobonus, bonus facciate) comprese cessione del credito e sconto in fattura.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Trasparenza</h3>
            <p>Preventivi dettagliati con computo metrico. Nessun extra non concordato. Mai.</p>
          </li>
          <li>
            <h3>Qualità dei materiali</h3>
            <p>Solo materiali CE certificati. Kerakoll, Weber, Mapei, Rehau, ABB. Nessuna economia sulle fondamenta.</p>
          </li>
          <li>
            <h3>Rispetto dei tempi</h3>
            <p>Cronoprogramma a milestone concordato. 94% dei cantieri consegnati nei tempi stabiliti.</p>
          </li>
          <li>
            <h3>Garanzie reali</h3>
            <p>Polizza RC €2M, DURC regolare, garanzia biennale edile e decennale strutturale per legge.</p>
          </li>
        </ul>
      </section>

      <section class="team">
        <h2>Il nostro team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of vm.team.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of vm.faq.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
      </section>

      <div class="cta-inline">
        <h3>Pronto a iniziare?</h3>
        <p>Sopralluogo gratuito e preventivo dettagliato in 5 giorni lavorativi.</p>
        <a routerLink="/preventivo" class="btn btn-primary">Richiedi preventivo</a>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-default);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
        font-size: 1rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.85rem;
      }
      .team-card__bio {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.5;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .faq {
        margin-bottom: 4rem;
      }
      .faq h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      .faq-item {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .faq-item h3 {
        margin: 0 0 0.75rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .cta-inline {
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
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly vm$ = combineLatest({
    team: this.mockData.team$,
    faq: this.mockData.faq$
  });
}
