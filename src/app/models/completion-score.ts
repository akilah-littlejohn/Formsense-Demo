export interface CompletionScore {
    score: number;             
    missing: (keyof FormData)[]; 
    note?: string;              
}
