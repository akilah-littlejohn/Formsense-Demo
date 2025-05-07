export function buildFormSensePrompt(narrative: string, today: string): string {
    return `
  You are an intelligent form assistant.
  
  Your task is to extract structured fields from a user's plain-English description of a car accident or incident.
  
  Use today's date as: "${today}"
  
  Return a strict JSON object with these keys:
  
  {
    "incidentDate": (ISO string, e.g., "2025-05-04"),
    "accidentType": (short phrase, e.g., "Rear-end collision"),
    "damageDescription": (short summary of visible damage),
    "injuries": ("Yes", "No", or "Unclear"),
    "notes": (contextual observations or useful extra details)
  }
  
  Rules:
  - If the user says "yesterday", subtract one day from today.
  - If no injury is mentioned, use "Unclear".
  - Use empty strings "" if unsure.
  - Do not include extra text, only valid JSON.
                       
  Respond ONLY in strict JSON. Do not include any explanation, no markdown.

  
  User Input:
  "${narrative}"
  `;
  
  }
  