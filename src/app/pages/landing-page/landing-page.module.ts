import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/angular-material.module';
import { LandingPageRoutes } from './landing-page.routing';
import { NgModule } from '@angular/core';
import { MembersListComponent } from '../members/members-list/members-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LandingPageRoutes),
    FormsModule,
    OverlayModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  declarations: [MembersListComponent],
})
export class AdminLayoutModule {}
