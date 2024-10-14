import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'libs/core/src/lib/core.module';
import { SettingsModule } from 'libs/settings/src/public-api';
import { SharedModule } from 'libs/shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InventoryModule } from 'libs/inventory/src/public-api';
import { PageNotFoundModule } from 'libs/page-not-found/src/public-api';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BillingModule } from 'libs/billing/src/public-api';
import { NgSelectModule } from '@ng-select/ng-select';
import { TransactionsModule } from 'libs/transactions/src/lib/transactions.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    HttpClientModule,
    NgbModule,
    BillingModule,
    CommonModule,
    AppRoutingModule,
    SettingsModule,
    SharedModule,
    CoreModule,
    InventoryModule,
    TransactionsModule,
    PageNotFoundModule,
    ToastrModule.forRoot(
      {
        timeOut:3000,
        preventDuplicates:true,
        positionClass:'toast-top-right'
      }
    )
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
