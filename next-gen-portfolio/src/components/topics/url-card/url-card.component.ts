import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { UrlShortnerComponent } from './url-shortner/url-shortner.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-url-card',
  standalone: true,
  imports: [UrlShortnerComponent, CardModule, OverlayPanelModule, DialogModule, Button],
  templateUrl: './url-card.component.html',
  styleUrl: './url-card.component.css'
})
export class UrlCardComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
