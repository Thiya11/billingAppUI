import { NgModule } from '@angular/core';
import { TransactionsComponent } from './components/transactions-list/transactions.component';
import { TransactionsRouterModule } from './transactions-router.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionInfoComponent } from './components/transaction-info/transaction-info.component';



@NgModule({
  declarations: [
    TransactionsComponent,
    TransactionInfoComponent
  ],
  imports: [
    CommonModule,
    TransactionsRouterModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [
    TransactionsComponent
  ]
})
export class TransactionsModule { }
