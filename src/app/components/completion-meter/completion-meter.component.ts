import { Component, Input, computed, signal } from '@angular/core';
import { MaterialUiModule } from '../../shared/material-ui/material-ui.module';

@Component({
  selector: 'app-completion-meter',
  imports: [MaterialUiModule],
  template: `
<p>Form Completion: {{ score }}%</p>
<mat-progress-bar [value]="score" [color]="color()" mode="determinate"></mat-progress-bar>

  `,
  styles: ``
})
export class CompletionMeterComponent {
  @Input() score = 0;
  scoreSignal = signal(0);

  ngOnChanges() {
    this.scoreSignal.set(this.score);
  }

  color = computed(() => {
    const val = this.scoreSignal();
    if (val >= 100) return 'accent';
    if (val >= 80) return 'primary';
    return 'warn';

  });
}
