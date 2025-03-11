import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MenubarModule,RippleModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
 constructor(private router: Router){}
  items: MenuItem[] | undefined;

  ngOnInit(){
    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
        routerLink: '/home'
      },
      {
        label: "Projects",
        icon: "pi pi-list-check",
        routerLink: '/projects'
      },
      {
        label: "About",
        icon: "pi pi-user",
        routerLink: '/about'
      }
    ]
  }
}
