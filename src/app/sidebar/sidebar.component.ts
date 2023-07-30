import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteInfo } from '../util/routeInfo';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { SideBarService } from '../services/sidebar.service';

interface states {
  menu: string;
  isExpanded: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userEmail = this.authService.getUserEmail();
  first_name = this.authService.getUserFullName();

  expanded: boolean = false;
  expandState: states[] = [];
  public opened: boolean = true;
  public menuItems: any[] | undefined;
  private mediaWatcher: Subscription;
  systemName: string = 'Admin Panel';
  @ViewChild('sidenav') sideBar!: MatSidenav;

  constructor(
    private authService: AuthService,
    public router: Router,
    private media: MediaObserver,
    private sideBarService: SideBarService,
    private menu: MenuService
  ) {
    this.mediaWatcher = this.media.media$.subscribe(
      (mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      }
    );
  }

  async ngAfterViewInit() {
    this.sideBarService.setSidenav(this.sideBar);
  }

  ngOnInit() {
    this.menuItems = this.menu.routes.filter((menuItem) => menuItem);
  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  onItemSelected(routeItem: RouteInfo) {
    if (
      (!routeItem.children || !routeItem.children.length) &&
      this.router.url != routeItem.path
    ) {
      this.router.navigate([routeItem.path]);
    }

    if (routeItem.children && routeItem.children.length) {
      var currStateIndex = this.expandState.findIndex(
        (e) => e.menu == routeItem.path
      );
      if (currStateIndex < 0) {
        this.expandState.push({ menu: routeItem.path, isExpanded: false });
        currStateIndex = this.expandState.length - 1;
      }
      this.expandState[currStateIndex].isExpanded =
        !this.expandState[currStateIndex].isExpanded;
    }
  }

  parentMenuState(menu: string): boolean {
    return this.expandState.find((e) => e.menu == menu)?.isExpanded || false;
  }

  ngOnDestroy() {
    this.mediaWatcher.unsubscribe();
  }
  logout() {
    sessionStorage.setItem('isLoggedIn', 'false');
    window.location.reload();
  }
}
