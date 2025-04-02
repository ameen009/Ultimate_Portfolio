import { Component } from '@angular/core';
import { UrlCardComponent } from '../topics/url-card/url-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [UrlCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  
}
