export interface GeminiResponse {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
      };
    }[];
  }
  
  // Type guard to verify response format at runtime
  export function isGeminiResponse(obj: any): obj is GeminiResponse {
    return (
      obj &&
      Array.isArray(obj.candidates) &&
      obj.candidates.length > 0 &&
      obj.candidates[0]?.content?.parts?.[0]?.text !== undefined
    );
  }