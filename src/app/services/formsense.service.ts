import { Injectable, signal} from '@angular/core';
import { FormData } from '../models/form-data';

@Injectable({
  providedIn: 'root'
})
export class FormsenseService {

  readonly formData = signal<FormData>({
    incidentDate: '',
    accidentType: '',
    damageDescription: '',
    injuries: 'Unclear',
    notes: '',
  });

  updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  reset() {
    this.formData.set({
      incidentDate: '',
      accidentType: '',
      damageDescription: '',
      injuries: 'Unclear',
      notes: '',
    });
  }
}
