import { Component } from '@angular/core';
import { CardComponent } from '../../shared/templates/card/card.component';
import { UrlShortnerComponent } from '../topics/url-shortner/url-shortner.component';
import { ProjectDescription } from '../../shared/util/project-description';
import { RateLimiterComponent } from '../topics/rate-limiter/rate-limiter.component';
import { CollaborativeEditorComponent } from '../topics/collaborative-editor/collaborative-editor.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ CardComponent,UrlShortnerComponent,RateLimiterComponent, CollaborativeEditorComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  getDescription(projectName: keyof typeof ProjectDescription): string {
    return ProjectDescription[projectName] || 'Description not available.';
  }
}
