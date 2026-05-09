import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Edilcasa Costruzioni — Ristrutturazioni e nuove costruzioni a Bari'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Edilcasa Costruzioni Bari'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Edilcasa Costruzioni Bari'
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.component').then((m) => m.PortfolioComponent),
    title: 'Portfolio lavori — Edilcasa Costruzioni Bari'
  },
  {
    path: 'preventivo',
    loadComponent: () => import('./pages/preventivo/preventivo.component').then((m) => m.PreventivoComponent),
    title: 'Richiedi preventivo gratuito — Edilcasa Costruzioni'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
