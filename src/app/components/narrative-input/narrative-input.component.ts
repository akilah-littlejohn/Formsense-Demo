import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GeminiService } from '../../services/gemini.service';
import { FormsModule } from '@angular/forms';
import { FormsenseService } from '../../services/formsense.service';
import { sanitizeFormData } from '../../utils/build-sanitize-data';
import { MaterialUiModule } from '../../shared/material-ui/material-ui.module';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-narrative-input',
  imports: [MaterialUiModule, FormsModule, CommonModule],
  template: `

  <h1>Tell Us About Your Claim</h1>
  <section class="claim-form-container">
  <h3>Tell us what happened — just like you would for a car insurance claim.</h3>

  <p>Describe your incident in your own words, like you're explaining it to an agent or writing on a claim form. You can include what happened, when it happened, what was damaged, 
  and whether anyone was hurt. FormSense will read your story and help fill out the form for you — making the process faster, easier, and more accurate.</p>

  </section>

  <img [src]="heroImageUrl" alt="" srcset="">
  <div class="claim-form-container">
  <mat-form-field appearance="fill" class="full-width">
    <mat-label>Incident Description</mat-label>
    <textarea
      matInput
      rows="6"
      [(ngModel)]="narrative"
      placeholder="E.g. I got rear-ended yesterday on Main St..."
    ></textarea>
  </mat-form-field>

  <button
     mat-raised-button 
    color="primary" 
    (click)="analyze()" 
    [disabled]="loading || !narrative.trim()"
    class="submit-button full-width">
    <mat-icon aria-hidden="false" aria-label="material list alt icon" fontIcon="sparkles"></mat-icon>

    {{ loading ? 'Analyzing...' : 'Analyze' }}
    
  </button>
  
  <mat-error *ngIf="error" class="error-message">{{ error }}</mat-error>
</div>
  `,
  styles: `
  .claim-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  object-fit: contain;
}
h1 {

  margin-bottom: 24px;
  text-align: center;
  font-family: "Cal Sans", sans-serif;
  font-size: 28px;
}

.full-width {
  width: 100%;
}

textarea {
  min-height: 120px;
  font-family: inherit;
}



.submit-button {
  margin-top: 16px;
  min-width: 120px;
  font-weight: 500;
}



.error-message {
  margin-top: 16px;
  display: block;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  .claim-form-container {
    padding: 12px;
  }
  
  textarea {
    min-height: 100px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 20px;
  }
  
  .submit-button {
    width: 100%;
  }
}`
})
export class NarrativeInputComponent {

  narrative = '';
  loading = false;
  error = '';
  heroImageUrl = environment.images.homePage

  private formDataService = inject(FormsenseService);
  private gemini = inject(GeminiService);
  private router = inject(Router);

  analyze() {
    if (!this.narrative.trim()) return;
    this.loading = true;
    this.error = '';
    const today = new Date().toISOString().split('T')[0];

    this.gemini.analyze(this.narrative, today).subscribe({
      next: (res) => {
        try {
          const raw = res.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
          // More robust JSON extraction
          const jsonMatch = raw.match(/```json\s*([\s\S]*?)\s*```/i);
          const jsonString = jsonMatch ? jsonMatch[1] : raw; // Extract or fallback

          const parsed = sanitizeFormData(JSON.parse(jsonString));
          this.formDataService.formData.set(parsed);
          this.router.navigate(['/form']);
        } catch (e) {
          console.error('JSON Parsing Error:', e);
          this.error = 'AI could not parse your input.';
        }
      },
      error: () => (this.error = 'Error reaching AI agent.'),
      complete: () => (this.loading = false),
    });
  }
}