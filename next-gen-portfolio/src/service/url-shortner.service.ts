import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShortUrl } from '../models/urlshortner.model';

@Injectable({
  providedIn: 'root'
})
export class UrlShortnerService {
  private apiUrl = 'http://localhost:8080/shorten';
  private apiUrlGetAll = 'http://localhost:8080/allurls';

  constructor(private http: HttpClient) {}

  shortenUrl(longUrl: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' }); // ✅ Set Content-Type to text/plain

    return this.http.post(this.apiUrl, longUrl, { headers, responseType: 'text' }); // ✅ Send raw text
  }

  getAllUrls(): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(this.apiUrlGetAll)
  }

  deleteUrl(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/${id}`);
  }
}
