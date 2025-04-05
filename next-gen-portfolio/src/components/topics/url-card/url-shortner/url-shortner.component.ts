import { Component } from '@angular/core';
import { UrlShortnerService } from '../../../../service/url-shortner.service';
import { NgIf } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ShortUrl } from '../../../../models/urlshortner.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-url-shortner',
  standalone: true,
  imports: [NgIf, FormsModule, TableModule, CommonModule, ToastModule, ButtonModule],
  providers:[MessageService],
  templateUrl: './url-shortner.component.html',
  styleUrl: './url-shortner.component.css'
})
export class UrlShortnerComponent {
    longUrl: string = '';
    shortUrl: string = '';
    allUrls: ShortUrl[] = [];
  
    constructor(private urlShortenerService: UrlShortnerService,
      private messageService: MessageService
    ) {}

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

    deleteUrl(id: string): void{
      this.urlShortenerService.deleteUrl(id).subscribe({
        next: () => {
          this.allUrls = this.allUrls.filter(url => url.id !== id);
          this.messageService.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Short URL deleted successfully',
          });
        },
        error: (err) => {
          console.error('Error deleting URL', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete short URL',
          });
        }
      });
    }
  
    shortenUrl() {
      if (!this.longUrl) return;
  
      this.urlShortenerService.shortenUrl(this.longUrl).subscribe({
        next: (response) => {
          this.shortUrl = response; // ✅ Since responseType is 'text', we directly get a string
          this.getAllUrls();
        },
        error: (err) => {
          console.error('Error shortening URL:', err);
        }
      });
    }
}
