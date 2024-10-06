import { NgModule } from '@angular/core';
import { BillRoutingModule } from './billing-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BillingComponent } from './components/billing-base/billing.component';
import { SharedModule } from 'libs/shared/shared.module';
import { BillingSummaryComponent } from './components/billing-summary/billing-summary.component';

@NgModule({
  declarations: [
    BillingComponent,
    BillingSummaryComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    NgSelectModule,
    BillRoutingModule
  ],
  exports: [
  ]
})
export class BillingModule { }
