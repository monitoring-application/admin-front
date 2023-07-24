import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/angular-material.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SideBarService } from './services/sidebar.service';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MembersLoginComponent } from './pages/members/members-login/members-login.component';
import { AttachmentsComponent } from './pages/members/attachments/attachments.component';
import { AttachmentsFieldsComponent } from './shared/components/attachments-fields/attachments-fields.component';
import { AttachmentsListComponent } from './shared/components/attachments-list/attachments-list.component';
import { DownlineListComponent } from './pages/members/downline/downline-list/downline-list.component';
import { DownlineDlgComponent } from './pages/members/downline/downline-dlg/downline-dlg.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    SignUpComponent,
    MembersLoginComponent,
    AttachmentsComponent,
    AttachmentsFieldsComponent,
    AttachmentsListComponent,
    DownlineListComponent,
    DownlineDlgComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    NoopAnimationsModule,
    SidebarModule,
  ],
  providers: [SideBarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
