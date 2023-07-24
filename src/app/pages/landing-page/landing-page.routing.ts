import { Routes } from '@angular/router';
import { MembersListComponent } from '../members/members-list/members-list.component';

export const LandingPageRoutes: Routes = [
  { path: 'members', component: MembersListComponent },
];
