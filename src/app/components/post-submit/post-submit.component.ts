import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialUiModule } from '../../shared/material-ui/material-ui.module';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-post-submit',
  imports: [CommonModule, MaterialUiModule],
  template: `
<section class="thank-you-screen">
  <h1>Form Submitted</h1>
  <p>Thank you for using FormSense. Your info has been saved.</p>
  <img [src]="submitImg" alt="" srcset="">
<button mat-raised-button color="primary" (click)="restart()">Start Over</button>
</section>
  `,
  styles: `
  .thank-you-screen {  
  font-family: "Cal Sans", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
  padding: 2rem;
  margin: 1rem auto;
  max-width: 600px;
  border-radius: 8px;
  background-color:#f5ebe0;  ;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  img {
  max-width: 60%;
  height: auto;
  display: block;
  margin: 0 auto;
  object-fit: contain;
}
  `
})
export class PostSubmitComponent {
  router = inject(Router)
  submitImg = environment.images.postSubmit
  restart() {
    this.router.navigate(['/']);
  }

}
