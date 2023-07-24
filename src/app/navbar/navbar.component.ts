import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SideBarService } from '../services/sidebar.service';
import { MenuService } from '../services/menu.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private listTitles!: any[];
  private toggleButton: any;
  location: Location;
  private sidebarVisible: boolean;
  public isCollapsed = true;

  @ViewChild('app-navbar', { static: false }) button: any;

  constructor(
    location: Location,
    private sidenav: SideBarService,
    private element: ElementRef,
    public router: Router,
    private menu: MenuService,
    public dialog: MatDialog
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit(): void {
    this.listTitles = this.menu.routes.filter((listTitle) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName('main-panel')[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
      if (this.listTitles[item].children.length > 0) {
        for (
          var subitem = 0;
          subitem < this.listTitles[item].children.length;
          subitem++
        ) {
          if (this.listTitles[item].children[subitem].path === titlee) {
            return this.listTitles[item].children[subitem].title;
          }
        }
      }
    }
    return '';
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }
  }

  logout() {
    localStorage.setItem('accessToken', '');
    this.router.navigate(['login']);
  }
}
