import { NgModule } from '@angular/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { SettingsBaseComponent } from './components/settings-base/settings-base.component';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { CommonModule } from '@angular/common';
import { RoleInfoComponent } from './components/roles-info/role-info.component';
import { SharedModule } from 'libs/shared/shared.module';
import { SharedValidatorsModule } from 'libs/shared/modules/shared-validators.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SettingsBaseComponent,
    RolesListComponent,
    UsersListComponent,
    RoleInfoComponent
  ],
  imports: [
    SettingsRoutingModule,
    SharedModule,
    SharedValidatorsModule,
    ReactiveFormsModule,
    NgbModule,
    CommonModule
  ],
  exports: [
    SettingsBaseComponent
  ]
})
export class SettingsModule { }
