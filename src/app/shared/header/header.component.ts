import { Component } from '@angular/core';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@Component({
  selector: 'app-header',
  imports: [MaterialUiModule],
  template: `
 <mat-toolbar>
 <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="list-alt"></mat-icon>

  <span>FormSenseDemo</span>
</mat-toolbar>
  `,
  styles: `
  span {
  margin:.5em;
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

  `
})
export class HeaderComponent {

}
