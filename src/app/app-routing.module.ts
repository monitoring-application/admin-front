import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MembersLoginComponent } from './pages/members/members-login/members-login.component';
import { AttachmentsComponent } from './pages/members/attachments/attachments.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'member-login',
    component: MembersLoginComponent,
  },
  {
    path: 'member-attachments',
    component: AttachmentsComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/landing-page/landing-page.module').then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
