// Tipi TypeScript per i dati mock dell'impresa edile

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariUfficio {
  lunedi_venerdi: string;
  sabato: string;
  domenica: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  cassaEdile: string;
  piva: string;
  anniAttivita: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariUfficio;
  metaSeo: MetaSeo;
}

export interface Servizio {
  id: string;
  nome: string;
  descrizione: string;
  dettagli: string[];
  incentivi?: string[];
  icon: string;
  ordine: number;
}

export interface Servizi {
  servizi: Servizio[];
}

export interface CategoriaPorgetto {
  id: string;
  nome: string;
}

export interface Progetto {
  id: number;
  titolo: string;
  categoria: string;
  localita: string;
  anno: number;
  mq: number;
  descrizione: string;
  descrizioneBefore: string;
  descrizioneAfter: string;
  durataMesi: number;
  incentivo?: string;
  tags: string[];
}

export interface Portfolio {
  categorie: CategoriaPorgetto[];
  progetti: Progetto[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  specialita: string[];
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
  categoria: string;
}

export interface Faq {
  faq: FaqItem[];
}
