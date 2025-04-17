import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CoreRouterModule } from './core-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedValidatorsModule } from 'libs/shared/modules/shared-validators.module';
import { OverviewComponent } from './overview/overview.component';
import { RegisterComponent } from './register/register.component';
import { SharedComponentsModule } from 'libs/shared/components/shared-component.module';
import { ForgotResetPasswordComponent } from './forgot-reset-password/forgot-reset-password.component';


@NgModule({
  declarations: [
    CoreComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    OverviewComponent,
    RegisterComponent,
    ForgotResetPasswordComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    CoreRouterModule,
    ReactiveFormsModule,
    SharedValidatorsModule,
    SharedComponentsModule
],
  providers:[
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule { }
