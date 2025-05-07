import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { NarrativeInputComponent} from './components/narrative-input/narrative-input.component';

import { FormViewComponent } from './components/form-view/form-view.component';
import { PostSubmitComponent } from './components/post-submit/post-submit.component';
import { provideRouter, Routes} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  { path: '', component: NarrativeInputComponent },
  { path: 'form', component: FormViewComponent },
  { path: 'thank-you', component: PostSubmitComponent },
  { path: '**', redirectTo: '' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient() ]
};
