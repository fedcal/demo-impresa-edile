import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

const TIPI_INTERVENTO = [
  'Ristrutturazione casa completa',
  'Ristrutturazione bagno',
  'Ristrutturazione cucina',
  'Risanamento facciata',
  'Isolamento termico / cappotto',
  'Impianto fotovoltaico',
  'Abbattimento barriere architettoniche',
  'Pratiche edilizie / Superbonus',
  'Altro'
] as const;

const BUDGET_RANGE = [
  'Meno di €5.000',
  '€5.000 – €15.000',
  '€15.000 – €30.000',
  '€30.000 – €60.000',
  '€60.000 – €100.000',
  'Più di €100.000',
  'Non so ancora'
] as const;

const TIMELINE = [
  'Prima possibile',
  'Entro 3 mesi',
  'Entro 6 mesi',
  'Entro un anno',
  'Ancora da definire'
] as const;

@Component({
  selector: 'app-preventivo',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Richiedi un preventivo gratuito</h1>
        <p>Sopralluogo gratuito. Preventivo dettagliato in 5 giorni lavorativi. Senza impegno.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="form-grid">
        <aside class="info-sidebar">
          <h2>Come funziona</h2>
          <ol class="steps-list">
            <li>
              <span class="step-num">1</span>
              <div>
                <h3>Compila il form</h3>
                <p>Descrivici il tuo progetto con i dati principali.</p>
              </div>
            </li>
            <li>
              <span class="step-num">2</span>
              <div>
                <h3>Sopralluogo gratuito</h3>
                <p>Il nostro tecnico viene a casa tua entro 48h lavorative.</p>
              </div>
            </li>
            <li>
              <span class="step-num">3</span>
              <div>
                <h3>Preventivo dettagliato</h3>
                <p>Computo metrico estimativo e capitolato in 5 giorni.</p>
              </div>
            </li>
            <li>
              <span class="step-num">4</span>
              <div>
                <h3>Conferma e inizio lavori</h3>
                <p>Cronoprogramma, pratiche e cantiere avviato.</p>
              </div>
            </li>
          </ol>

          <div class="contact-box">
            <h3>Preferisci chiamare?</h3>
            <a href="tel:+390805557890" class="contact-link">☎ 080 555 7890</a>
            <a href="https://wa.me/393335557890" target="_blank" rel="noopener" class="contact-link">
              📱 WhatsApp
            </a>
          </div>
        </aside>

        <section class="form-block">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <h2>Dati del progetto</h2>

            <div class="field">
              <label for="tipoIntervento">Tipo di intervento *</label>
              <select id="tipoIntervento" formControlName="tipoIntervento" required>
                <option value="" disabled>Seleziona...</option>
                <option *ngFor="let t of tipiIntervento" [value]="t">{{ t }}</option>
              </select>
            </div>

            <div class="row-2">
              <div class="field">
                <label for="mq">Superficie (m²) approssimativa</label>
                <input
                  id="mq"
                  type="number"
                  formControlName="mq"
                  min="1"
                  max="2000"
                  placeholder="es. 80"
                />
              </div>
              <div class="field">
                <label for="localita">Comune / zona</label>
                <input
                  id="localita"
                  type="text"
                  formControlName="localita"
                  placeholder="es. Bari, Triggiano..."
                />
              </div>
            </div>

            <div class="field">
              <label for="budget">Range di budget *</label>
              <select id="budget" formControlName="budget" required>
                <option value="" disabled>Seleziona...</option>
                <option *ngFor="let b of budgetRange" [value]="b">{{ b }}</option>
              </select>
            </div>

            <div class="field">
              <label for="timeline">Quando vorresti iniziare i lavori? *</label>
              <select id="timeline" formControlName="timeline" required>
                <option value="" disabled>Seleziona...</option>
                <option *ngFor="let t of timeline" [value]="t">{{ t }}</option>
              </select>
            </div>

            <div class="field">
              <label for="descrizione">Descrizione del progetto</label>
              <textarea
                id="descrizione"
                formControlName="descrizione"
                rows="4"
                placeholder="Descrivi brevemente il lavoro da fare, eventuali criticità o esigenze particolari..."
              ></textarea>
            </div>

            <h2>Dati di contatto</h2>

            <div class="row-2">
              <div class="field">
                <label for="nome">Nome e cognome *</label>
                <input id="nome" type="text" formControlName="nome" required autocomplete="name" />
              </div>
              <div class="field">
                <label for="telefono">Telefono *</label>
                <input id="telefono" type="tel" formControlName="telefono" required autocomplete="tel" />
              </div>
            </div>

            <div class="field">
              <label for="email">Email *</label>
              <input id="email" type="email" formControlName="email" required autocomplete="email" />
            </div>

            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali per la gestione del preventivo (D.Lgs. 196/2003, GDPR 2016/679).
              </label>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta preventivo
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene realmente inviato. In un sito reale riceveresti un'email di conferma entro 2 ore.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">✅</span>
              <h2>Richiesta inviata!</h2>
              <p>
                Grazie <strong>{{ form.value.nome }}</strong>! Abbiamo ricevuto la tua richiesta per
                <strong>{{ form.value.tipoIntervento }}</strong> a {{ form.value.localita || 'Bari' }}.
              </p>
              <p>Il nostro tecnico ti contatterà entro 48h lavorative per fissare il sopralluogo gratuito.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">
                Nuova richiesta
              </button>
            </div>
          </ng-template>
        </section>
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
      .form-grid {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 3rem;
        align-items: start;
      }
      @media (max-width: 768px) {
        .form-grid {
          grid-template-columns: 1fr;
        }
      }
      .info-sidebar h2 {
        margin: 0 0 1.5rem;
        font-size: 1.1rem;
      }
      .steps-list {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      .steps-list li {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      .step-num {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.85rem;
        flex-shrink: 0;
      }
      .steps-list h3 {
        margin: 0 0 0.2rem;
        font-size: 0.95rem;
      }
      .steps-list p {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .contact-box {
        padding: 1.25rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .contact-box h3 {
        margin: 0 0 0.75rem;
        font-size: 0.95rem;
      }
      .contact-link {
        display: block;
        color: var(--color-accent);
        font-weight: 600;
        text-decoration: none;
        padding: 0.4rem 0;
        font-size: 0.9rem;
      }
      .contact-link:hover {
        text-decoration: underline;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
        font-size: 1.1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--color-border);
      }
      .form-block h2:not(:first-child) {
        margin-top: 2rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
        color: var(--color-fg-default);
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .field--checkbox input[type="checkbox"] {
        margin-top: 0.1rem;
        flex-shrink: 0;
        padding: 0;
        width: 16px;
        height: 16px;
      }
      .row-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      @media (max-width: 480px) {
        .row-2 {
          grid-template-columns: 1fr;
        }
      }
      .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
        width: 100%;
        text-align: center;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover:not(:disabled) {
        background: var(--color-accent-dark);
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        text-align: center;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou__icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h2 {
        color: var(--color-success);
        margin: 0 0 1rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        font-size: 0.95rem;
      }
      .thankyou button {
        margin-top: 1.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreventivoComponent {
  private readonly fb = inject(FormBuilder);

  readonly tipiIntervento = TIPI_INTERVENTO;
  readonly budgetRange = BUDGET_RANGE;
  readonly timeline = TIMELINE;

  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    tipoIntervento: ['', Validators.required],
    mq: [null as number | null],
    localita: [''],
    budget: ['', Validators.required],
    timeline: ['', Validators.required],
    descrizione: [''],
    nome: ['', [Validators.required, Validators.minLength(2)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    email: ['', [Validators.required, Validators.email]],
    privacy: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false });
    this.submitted.set(false);
  }
}
