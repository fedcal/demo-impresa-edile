# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Blu primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi logo SVG in `public/logo.svg`.

## Cambiare i metadati SEO

Edita `src/index.html` per title globale, meta description, Open Graph.

---

## Possibili Sviluppi Customizzabili

### 3D & Visualizzazione

1. **Fotogrammetria 3D nuvola punti**
   - Drone scan cantiere → modello 3D
   - Overlay foto settimanale

2. **Integrazione CAD**
   - Import DWG/PDF da progettista
   - Overlay foto vs planimetria

3. **AR simulazione before/after**
   - WebXR visualizzazione ristrutturazione

### Operazionale

4. **Budget vs actual tracking**
   - Alert overspend >10% preventivo
   - Grafici consumo per fase

5. **Subcontractor AI-matching**
   - Search skill + location + rating
   - Assegnazione specializzati

6. **Progress photo verification AI**
   - Milestone detection automatico
   - Proof per pagamenti clado

7. **Material JIT procurement**
   - Stock management + auto-ordine

### Compliance & Legal

8. **Permessi comune AI-assisted**
   - Pre-compilazione SUAP/SCIA
   - Checklist CILA adempimenti

9. **Collaudo decennale escrow**
   - Certificazione allegato fattura
   - Garanzia 10 anni tracciata

10. **Piani di sicurezza DPI**
    - Checklist accesso cantiere
    - Video safety induction

11. **Pagamenti escrow Stripe**
    - Protezione cliente
    - Autoreleash milestone

### Revenue & Marketing

12. **Varianti progetto approvabili**
    - Extra lavori pre-autorizzazione
    - Upsell automatico cliente

13. **Report finale consegna**
    - Dossier completo foto/stanze

14. **Manutentivo post-consegna**
    - Reminder 6-12 mesi
    - Controllo strutturale

15. **Energy audit + certificazione**
    - Classe energetica post-isolamento

---

## Note Implementative

- **Stack**: Angular 21 SSR + Spring Boot + Ollama qwen2.5
- **3D**: Three.js + WebXR per AR
- **Deploy**: Vercel demo + VPS cliente Superbonus
- **Timeline**: 12–16 settimane per vertical full-featured
