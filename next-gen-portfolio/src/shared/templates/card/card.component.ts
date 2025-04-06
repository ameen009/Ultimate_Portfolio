import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { UrlShortnerComponent } from '../../../components/topics/url-shortner/url-shortner.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule,UrlShortnerComponent,TagModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
	@Input() title:string = '';
  @Input() viewType: 'Modal' | 'FullView' = 'Modal';
  @Input() status: 'Completed' | 'InProgress' = 'InProgress';

  isModalOpen = false;

  dispatchAction(){
    if(this.viewType === 'Modal'){
      this.isModalOpen = true;
    }
  }

  getStatusSeverity(status: 'Completed' | 'InProgress'){
    return status === 'Completed' ? 'success' : 'warning';
  }
}
