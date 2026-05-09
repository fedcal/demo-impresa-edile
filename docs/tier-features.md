# Tier di Funzionalità

## Tier Avanzato — €5.000–6.000 (430 ore)

Destinato a **ditte edili e ristrutturatori** con pressione di budget overrun e coordinamento sottoappaltatori.

### Core Features

1. **Preventivo AR fotosimulazione before/after**
   - WebXR visualizzazione 3D della ristrutturazione
   - Cliente vede risultato finale prima di affidare
   - Export link shareable per consenso familiari

2. **Budget vs actual tracking realtime**
   - Fatture subappaltatori caricabili in app
   - AI alert overspend >10% rispetto preventivo
   - Grafici consumo per fase lavori

3. **Subcontractor AI-matching**
   - Search skill (muratura, impianti, pittura) + location + rating
   - Suggerimento automatico per job specializzati
   - Integrazione pagamento split in-app tracciato

4. **Progress photo verification AI**
   - Fotocamera weekly milestone validation
   - Computer vision detect "ponteggi" vs "fondazioni scavate"
   - Proof per milestone pagamenti clado

5. **Material JIT procurement**
   - Stock management integrato supplier
   - Ordine automatico quando quantità <soglia
   - Forecast consumo da cantiere AI

6. **Milestone certification pagamenti**
   - Pagamento clado solo dopo milestone raggiunto
   - Stripe escrow protezione cliente
   - Automatico al sign-off foto tecnico

7. **Permessi comune AI-assisted**
   - Pre-compilazione SUAP/SCIA forma automatica
   - Checklist adempimenti CILA
   - URL comune upload diretto

8. **Collaudo decennale + garanzia escrow**
   - Certificazione coll. allegato automatico
   - Polizza 10 anni archiviata
   - Tracking scadenze

### ROI Stimato
-40% budget overrun media (vs. settore 20–30% deficit)

---

## Customization Consigliate

- **Fotogrammetria 3D nuvola punti**: drone scan cantiere → modello 3D
- **Integrazione CAD**: import DWG/PDF da progettista, overlay foto cantiere
- **Piani di sicurezza DPI**: checklist accesso cantiere + video safety induction
- **Subappaltatori rating pubblico**: trasparenza valutazioni per clienti finali
- **Pagamenti in crypto**: opzione Stablecoin (USDC) per tracciabilità anti-riciclaggio
- **App mobile offline**: foto/video sync automatico quando riconnesso
- **Assicurazione cantiere**: integrazione polizza RC ditta + clienti
- **Fornitori materiali storici**: catalogo prezzi custom per fornitore preferito
- **Varianti progetto approvabili**: cliente approva extra lavori prima esecuzione
- **Report finale consegna**: dossier completo con tutte le foto ordinate per stanza
- **Manutentivo post-consegna**: reminder 6 mesi + 1 anno controllo strutturale
- **Energy audit post-lavori**: certificazione classe energetica post-isolamento

---

## Note Tecniche

- **Modello IA**: Ollama `qwen2.5:14b` + `llava:7b` vision per material detection
- **3D Viewer**: Three.js + WebXR immersive per AR client
- **Database**: PostgreSQL + GIS (PostGIS) per georeferenziazione cantieri
- **Compliance**: CILA, SUAP, Superbonus aggiornato 2026, GDPR
