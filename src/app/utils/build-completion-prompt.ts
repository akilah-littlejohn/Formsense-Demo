import { FormData } from '../models/form-data';

export function buildCompletionPrompt(form: FormData): string {
  return `
You're an assistant scoring the completeness of a structured form.

Review the following fields:
- Date: ${form.incidentDate}
- Accident Type: ${form.accidentType}
- Damage: ${form.damageDescription}
- Injuries: ${form.injuries}
- Notes: ${form.notes}

Score from 0 to 100% how complete and confident you are in this form.

Also briefly explain what might be missing or unclear.

Return this format:
{
  "score": 85,
  "missing": ["injuries"],
  "note": "Injury status is unclear, and date seems vague."

}
  Return a strict JSON object like this — do not include extra commentary or markdown:

Respond ONLY in strict JSON. Do not include any explanation, no markdown.

`;

}
