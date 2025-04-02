import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShortnerService {
  private apiUrl = 'http://localhost:8080/shorten';

  constructor(private http: HttpClient) {}

  shortenUrl(longUrl: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' }); // ✅ Set Content-Type to text/plain

    return this.http.post(this.apiUrl, longUrl, { headers, responseType: 'text' }); // ✅ Send raw text
  }
}
