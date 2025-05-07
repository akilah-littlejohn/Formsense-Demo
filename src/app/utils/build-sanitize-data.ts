import { FormData } from '../models/form-data'

const validInjuries = ['Yes', 'No', 'Unclear'];

export function sanitizeFormData(data: any): FormData {
  const safe: FormData = {
    incidentDate: typeof data.incidentDate === 'string' ? data.incidentDate : '',
    accidentType: typeof data.accidentType === 'string' ? data.accidentType : '',
    damageDescription: typeof data.damageDescription === 'string' ? data.damageDescription : '',
    injuries: validInjuries.includes(data.injuries) ? data.injuries : 'Unclear',
    notes: typeof data.notes === 'string' ? data.notes : '',
  };

  return safe;
}
