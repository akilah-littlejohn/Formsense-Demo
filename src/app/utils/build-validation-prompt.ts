export function buildValidationPrompt(field: string, newValue: string): string {
    return `
  You are an AI assistant helping a user complete a form based on their original story.
  
  Check if the user's updated value for the field "${field}" is logically consistent and valid.
  
  If it's okay, respond with:
    "Valid"
  
  If it conflicts with their story or seems unclear, return a friendly message explaining the issue. Example:
    "🧠 Heads-up: This value doesn't match what you originally said."
  
  Updated Field Value: "${newValue}"
  `;
  }