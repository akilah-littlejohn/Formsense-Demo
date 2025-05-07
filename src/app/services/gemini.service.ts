import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeminiResponse } from '../models/gemini-response';
import { buildFormSensePrompt} from '../utils/build-formsense-prompt';
import { buildValidationPrompt } from '../utils/build-validation-prompt';
import { buildCompletionPrompt } from '../utils/build-completion-prompt';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  apiKey = environment.geminiApiKey

  constructor(private http: HttpClient) { }

  analyze(narrative: string, today: string): Observable<GeminiResponse> {
    const prompt = buildFormSensePrompt(narrative, today);
    return this.sendPrompt(prompt);
  }
  validateField(field: string, value: string): Observable<GeminiResponse> {
    const prompt = buildValidationPrompt(field, value);
    return this.sendPrompt(prompt);
  }
  private sendPrompt(prompt: string): Observable<GeminiResponse> {
    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    };

    return this.http.post<GeminiResponse>(`${this.apiUrl}?key=${this.apiKey}`, body, {
      headers: this.headers,
    });
  }
}

