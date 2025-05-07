import { Component } from '@angular/core';
import { MaterialUiModule } from '../material-ui/material-ui.module';

@Component({
  selector: 'app-header',
  imports: [MaterialUiModule],
  template: `
 <mat-toolbar>
  <span>FormSenseDemo</span>
</mat-toolbar>
  `,
  styles: `
  span {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

  `
})
export class HeaderComponent {

}
