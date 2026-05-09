import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { CategoriaPorgetto, Progetto } from '../../data/types';

interface ProgettoView extends Progetto {
  activeTab: 'before' | 'after';
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, NgClass],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Portfolio lavori</h1>
        <p>12 progetti realizzati a Bari e provincia. Ristrutturazioni, facciate, fotovoltaico e molto altro.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="portfolio$ | async as data">
      <nav class="categoria-tabs" aria-label="Filtra per categoria">
        <button
          class="tab-btn"
          [ngClass]="{ 'tab-btn--active': selectedCategoria() === null }"
          (click)="selectCategoria(null)"
          type="button"
        >
          Tutti ({{ data.progetti.length }})
        </button>
        <button
          *ngFor="let cat of data.categorie"
          class="tab-btn"
          [ngClass]="{ 'tab-btn--active': selectedCategoria() === cat.id }"
          (click)="selectCategoria(cat.id)"
          type="button"
        >
          {{ cat.nome }} ({{ countByCategoria(data.progetti, cat.id) }})
        </button>
      </nav>

      <ul class="projects-list">
        <li
          *ngFor="let p of filteredProjects(data)"
          class="project-item"
        >
          <div class="project-item__header">
            <div class="project-item__meta">
              <span class="badge badge--cat">{{ getCategoryLabel(data.categorie, p.categoria) }}</span>
              <span class="project-item__year">{{ p.anno }}</span>
              <span *ngIf="p.incentivo" class="badge badge--green">{{ p.incentivo }}</span>
            </div>
            <h2>{{ p.titolo }}</h2>
            <p class="project-item__loc">
              {{ p.localita }}
              <span *ngIf="p.mq > 0"> · {{ p.mq }} m²</span>
              · {{ p.durataMesi }} {{ p.durataMesi === 1 ? 'mese' : 'mesi' }}
            </p>
            <p class="project-item__desc">{{ p.descrizione }}</p>
            <div class="project-item__tags">
              <span *ngFor="let tag of p.tags" class="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="before-after">
            <nav class="ba-tabs" [attr.aria-label]="'Before/after ' + p.titolo">
              <button
                class="ba-btn"
                [ngClass]="{ 'ba-btn--active': activeTab(p.id) === 'before' }"
                (click)="setTab(p.id, 'before')"
                type="button"
              >
                Prima
              </button>
              <button
                class="ba-btn"
                [ngClass]="{ 'ba-btn--active': activeTab(p.id) === 'after' }"
                (click)="setTab(p.id, 'after')"
                type="button"
              >
                Dopo
              </button>
            </nav>
            <div class="ba-panel" role="region" [attr.aria-label]="activeTab(p.id) === 'before' ? 'Prima dei lavori' : 'Dopo i lavori'">
              <div class="ba-image-placeholder" aria-hidden="true">
                <span>{{ activeTab(p.id) === 'before' ? '📷 Prima' : '✨ Dopo' }}</span>
              </div>
              <p class="ba-text">
                {{ activeTab(p.id) === 'before' ? p.descrizioneBefore : p.descrizioneAfter }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <p class="portfolio-note">
        Le immagini sono placeholder: in un sito reale ogni progetto includerebbe foto professionali before/after scattate da fotografo edile.
      </p>
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
      .categoria-tabs {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 2.5rem;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 1rem;
      }
      .tab-btn {
        padding: 0.5rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
        color: var(--color-fg-muted);
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .tab-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
      .tab-btn--active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: #ffffff;
        font-weight: 600;
      }
      .tab-btn--active:hover {
        color: #ffffff;
      }
      .projects-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
      }
      .project-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }
      .project-item__header {
        padding: 1.5rem;
        background: #ffffff;
      }
      .project-item__meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-bottom: 0.75rem;
      }
      .project-item__year {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-weight: 600;
      }
      .project-item__header h2 {
        margin: 0 0 0.25rem;
        font-size: 1.15rem;
      }
      .project-item__loc {
        font-size: 0.85rem;
        color: var(--color-accent);
        font-weight: 600;
        margin: 0 0 0.5rem;
      }
      .project-item__desc {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .project-item__tags {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .tag {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        border: 1px solid var(--color-border);
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--cat {
        background: #e7e5e4;
        color: var(--color-accent);
      }
      .badge--green {
        background: #dafbe1;
        color: var(--color-success);
      }
      .before-after {
        background: var(--color-bg-subtle);
        border-top: 1px solid var(--color-border);
      }
      .ba-tabs {
        display: flex;
        border-bottom: 1px solid var(--color-border);
      }
      .ba-btn {
        flex: 1;
        padding: 0.75rem;
        border: none;
        background: transparent;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-fg-muted);
        cursor: pointer;
        transition: all 0.15s ease;
        border-bottom: 2px solid transparent;
      }
      .ba-btn:hover {
        color: var(--color-fg-default);
        background: #ffffff;
      }
      .ba-btn--active {
        color: var(--color-accent);
        font-weight: 700;
        border-bottom-color: var(--color-accent);
        background: #ffffff;
      }
      .ba-panel {
        padding: 1.25rem;
      }
      .ba-image-placeholder {
        width: 100%;
        height: 200px;
        background: linear-gradient(135deg, #e7e5e4 0%, #d6d3d1 100%);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        margin-bottom: 1rem;
        border: 1px dashed var(--color-border);
      }
      .ba-text {
        font-size: 0.9rem;
        color: var(--color-fg-default);
        margin: 0;
        line-height: 1.6;
      }
      .portfolio-note {
        margin-top: 2.5rem;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  private readonly mockData = inject(MockDataService);

  readonly portfolio$ = this.mockData.portfolio$;

  readonly selectedCategoria = signal<string | null>(null);

  private readonly tabState = signal<Record<number, 'before' | 'after'>>({});

  selectCategoria(id: string | null): void {
    this.selectedCategoria.set(id);
  }

  activeTab(progettoId: number): 'before' | 'after' {
    return this.tabState()[progettoId] ?? 'before';
  }

  setTab(progettoId: number, tab: 'before' | 'after'): void {
    this.tabState.update((state) => ({ ...state, [progettoId]: tab }));
  }

  filteredProjects(data: { categorie: CategoriaPorgetto[]; progetti: Progetto[] }): Progetto[] {
    const cat = this.selectedCategoria();
    if (cat === null) {
      return data.progetti;
    }
    return data.progetti.filter((p) => p.categoria === cat);
  }

  countByCategoria(progetti: Progetto[], categoriaId: string): number {
    return progetti.filter((p) => p.categoria === categoriaId).length;
  }

  getCategoryLabel(categorie: CategoriaPorgetto[], categoriaId: string): string {
    return categorie.find((c) => c.id === categoriaId)?.nome ?? categoriaId;
  }
}
