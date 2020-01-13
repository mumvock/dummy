import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems = new Array<MenuItem>();

  constructor(private router: Router) { }

  ngOnInit() {

    this.router.config
      .filter(route => route.data)
      .forEach(route => {
        this.menuItems.push(route.data);
        const menuItem = this.menuItems[this.menuItems.length - 1];
        menuItem.routerLink = route.path.length ? route.path : '/';
        menuItem.routerLinkActiveOptions = { exact: true };
      });

    this.menuItems = this.menuItems.concat(
      [
        {
          label: 'About',
          icon: 'pi pi-fw pi-info-circle'
        },
        {
          separator: true
        }
      ]
    );

  }

}
