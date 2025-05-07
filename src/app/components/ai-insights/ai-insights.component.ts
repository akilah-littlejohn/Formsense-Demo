import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUiModule } from '../../shared/material-ui/material-ui.module';

@Component({
  selector: 'app-ai-insights',
  imports: [CommonModule, MaterialUiModule],
  template: `
<div *ngIf="notes"  role="note" aria-label="AI Insight">
  <mat-icon color="primary">psychology</mat-icon>
</div>
  `,
  styles: ``
})
export class AiInsightsComponent {

  @Input() notes: string = '';
}
