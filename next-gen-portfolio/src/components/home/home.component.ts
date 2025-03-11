import { Component, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { MenuItem } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { FadeEffectDirective } from '../../directives/fade-effect.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageModule, CardModule,SpeedDialModule,FadeEffectDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-pencil'
      },
      {
        icon: 'pi pi-refresh'
      },
      {
        icon: 'pi pi-trash'
      },
      {
        icon: 'pi pi-upload'
      },
      {
        icon: 'pi pi-external-link'
      }
    ]
  }
}
