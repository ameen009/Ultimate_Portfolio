import { Component } from '@angular/core';
import { UrlShortnerService } from '../../../../service/url-shortner.service';
import { NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-url-shortner',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './url-shortner.component.html',
  styleUrl: './url-shortner.component.css'
})
export class UrlShortnerComponent {
  longUrl: string = '';
    shortUrl: string = '';
  
    constructor(private urlShortenerService: UrlShortnerService) {}
  
    shortenUrl() {
      if (!this.longUrl) return;
  
      this.urlShortenerService.shortenUrl(this.longUrl).subscribe({
        next: (response) => {
          this.shortUrl = response; // ✅ Since responseType is 'text', we directly get a string
        },
        error: (err) => {
          console.error('Error shortening URL:', err);
        }
      });
    }
}
