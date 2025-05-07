import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialUiModule } from '../../shared/material-ui/material-ui.module';

@Component({
  selector: 'app-post-submit',
  imports: [CommonModule,MaterialUiModule  ],
  template: `
<section class="thank-you-screen">
  <h1>Form Submitted</h1>
  <p>Thank you for using FormSense. Your info has been saved.</p>
  <button mat-raised-button color="primary" (click)="restart()">Start Over</button>
</section>
  `,
  styles: ``
})
export class PostSubmitComponent {
  router = inject(Router)

  restart() {
    this.router.navigate(['/']);
  }

}
