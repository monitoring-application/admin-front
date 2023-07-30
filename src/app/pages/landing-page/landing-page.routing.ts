import { Routes } from '@angular/router';
import { MembersListComponent } from '../members/members-list/members-list.component';
import { PaymentRequestComponent } from '../payment-request/payment-request.component';

export const LandingPageRoutes: Routes = [
  { path: 'members', component: MembersListComponent },
  { path: 'payment-request', component: PaymentRequestComponent },
];
