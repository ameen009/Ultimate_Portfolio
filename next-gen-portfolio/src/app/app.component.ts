import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../components/nav/nav.component';
import { UrlShortnerComponent } from '../components/topics/url-card/url-shortner/url-shortner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent, UrlShortnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'next-gen-portfolio';
}
