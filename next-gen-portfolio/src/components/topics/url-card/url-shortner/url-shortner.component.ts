import { Component } from '@angular/core';
import { UrlShortnerService } from '../../../../service/url-shortner.service';
import { NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ShortUrl } from '../../../../models/urlshortner.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-url-shortner',
  standalone: true,
  imports: [NgIf, FormsModule, TableModule, CommonModule],
  templateUrl: './url-shortner.component.html',
  styleUrl: './url-shortner.component.css'
})
export class UrlShortnerComponent {
    longUrl: string = '';
    shortUrl: string = '';
    allUrls: ShortUrl[] = [];
  
    constructor(private urlShortenerService: UrlShortnerService) {}

    ngOnInit(): void {
      this.getAllUrls(); 
    }

    getAllUrls(){
      this.urlShortenerService.getAllUrls().subscribe({
        next: (response) => {
          this.allUrls = response;
        }
      })
    }
  
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
