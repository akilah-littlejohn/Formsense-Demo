import { Component } from '@angular/core';
import { GeminiService } from './services/gemini.service';
import { MaterialUiModule} from '../app/shared/material-ui/material-ui.module'
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MaterialUiModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  response: string = '';

  constructor(private geminiService: GeminiService) {}


}
