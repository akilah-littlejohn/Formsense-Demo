import { Component, signal, computed, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CompletionMeterComponent } from '../completion-meter/completion-meter.component'
import { FormsModule } from '@angular/forms'
import { AiInsightsComponent } from '../ai-insights/ai-insights.component'
import { GeminiService } from '../../services/gemini.service'
import { FormData } from '../../models/form-data'
import { FormsenseService } from '../../services/formsense.service'
import { Router } from '@angular/router'
import { MaterialUiModule } from '../../shared/material-ui/material-ui.module'

@Component({
  selector: 'app-form-view',
  imports: [MaterialUiModule, CommonModule, FormsModule, CompletionMeterComponent, AiInsightsComponent],
  template: `
<h2>Review & Confirm</h2>
<section class="form-container">

<mat-form-field appearance="fill" class="form-field">
  <mat-label>Date</mat-label>
  <input matInput type="date" [(ngModel)]="formData().incidentDate" (blur)="update('incidentDate', formData().incidentDate)" />
  <mat-hint *ngIf="validationMessages().incidentDate">{{ validationMessages().incidentDate }}</mat-hint>
</mat-form-field>

<mat-form-field appearance="fill" class="form-field">
  <mat-label>Accident Type</mat-label>
  <input matInput [(ngModel)]="formData().accidentType" (blur)="update('accidentType', formData().accidentType)" />
  <mat-hint *ngIf="validationMessages().accidentType">{{ validationMessages().accidentType }}</mat-hint>
</mat-form-field>

<mat-form-field appearance="fill" >
  <mat-label>Damage</mat-label>
  <textarea matInput [(ngModel)]="formData().damageDescription" (blur)="update('damageDescription', formData().damageDescription)"></textarea>
  <mat-hint *ngIf="validationMessages().damageDescription">{{ validationMessages().damageDescription }}</mat-hint>
</mat-form-field>

<mat-form-field appearance="fill" class="form-field">
  <mat-label>Injuries</mat-label>
  <mat-select [(ngModel)]="formData().injuries" (selectionChange)="update('injuries', formData().injuries)">
    <mat-option value="Yes">Yes</mat-option>
    <mat-option value="No">No</mat-option>
    <mat-option value="Unclear">Unclear</mat-option>
  </mat-select>
  <mat-hint *ngIf="validationMessages().injuries">{{ validationMessages().injuries }}</mat-hint>
</mat-form-field>

<mat-form-field appearance="fill" class="form-field">
  <mat-label>Notes</mat-label>
  <textarea matInput [(ngModel)]="formData().notes" (blur)="update('notes', formData().notes)"></textarea>
  <mat-hint *ngIf="validationMessages().notes">{{ validationMessages().notes }}</mat-hint>
</mat-form-field>

<app-ai-insights [notes]="formData().notes"></app-ai-insights>
<app-completion-meter [score]="completion()"></app-completion-meter>

<button mat-raised-button color="accent" (click)="submit()" [disabled]="completion() < 80">
  Submit
</button>
  


</section>

  `,
  styles: `

.form-container {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

h2 {
  font-size: 1.8rem;
  font-family: "Cal Sans", sans-serif;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Form field styling */
.form-field {
  width: 100%;
  margin-bottom: 1.25rem;
}

mat-form-field {
  width: 100%;
  margin-bottom: 1.25rem;
}

textarea {
  min-height: 80px;
}

mat-hint {
  color: #0369a1;
}


button[mat-raised-button] {
  margin-top: 1.5rem;
  height: 3rem;
  font-size: 1rem;
  letter-spacing: 0.5px;
  align-self: center;
  min-width: 150px;
  transition: all 0.2s ease;
}

button[mat-raised-button]:hover:not([disabled]) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

button[mat-raised-button][disabled] {
  background-color: #e2e8f0;
  color: #94a3b8;
}


app-ai-insights {
  margin: 1rem 0;
  display: block;
  border-radius: 6px;
  overflow: hidden;
}

app-completion-meter {
  margin: 1.5rem 0;
  display: block;
}

/* Responsive breakpoints */
@media (min-width: 768px) {
  .form-container {
    padding: 2rem;
  }
  
  /* Two column layout for wider screens */
  .form-field-row {
    display: flex;
    gap: 1.5rem;
  }
  
  .form-field-row > mat-form-field {
    flex: 1;
  }
}


@media (max-width: 767px) {
  .form-container {
    padding: 1rem;
    margin: 0 0.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  mat-form-field {
    margin-bottom: 0.75rem;
  }
  
  button[mat-raised-button] {
    width: 100%;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.3rem;
  }
  
  mat-hint {
    font-size: 0.8rem;
  }
}


@media (prefers-reduced-motion: reduce) {
  button[mat-raised-button]:hover:not([disabled]) {
    transform: none;
  }
}

/* Print styles */
@media print {
  .form-container {
    box-shadow: none;
    border: 1px solid #e2e8f0;
  }
  
  button[mat-raised-button] {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {
  .form-container {
    background-color: #1f2937;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    color: #f1f5f9;
  }
}
  
 
  `
})
export class FormViewComponent {

  private formDataService = inject(FormsenseService);
  private gemini = inject(GeminiService);
  private router = inject(Router);
  score: string = ''

  formData = this.formDataService.formData;
  validationMessages = signal<Partial<Record<keyof FormData, string>>>({});

  update(field: keyof FormData, value: string) {
    this.formDataService.updateField(field, value);
    this.gemini.validateField(field, value).subscribe({
      next: (res) => {
        const text = res.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        this.validationMessages.update(msgs => ({
          ...msgs,
          [field]: text.trim().toLowerCase() === 'valid' ? '' : text,
        }));
      },
      error: () =>
        this.validationMessages.update(msgs => ({
          ...msgs,
          [field]: '🧠 Error validating field.',
        })),
    });
  }

  completion = computed(() => {
    const d = this.formData();
    const filled = Object.values(d).filter(v => !!v && v.trim?.() !== '');
    return Math.round((filled.length / Object.keys(d).length) * 100);
  });

  submit() {
    console.log('Submitted:', this.formData());
    this.router.navigate(['/thank-you']);
  }
}
