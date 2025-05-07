export interface AiFeedback {
    field: keyof FormData;
    message: string;
    confidence?: number;
    hint?: string;
}
