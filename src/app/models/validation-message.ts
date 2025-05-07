import { FormData } from "./form-data";

export type ValidationMessage = Partial<Record<keyof FormData, string>>;

