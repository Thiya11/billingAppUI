import { RouterModule, Routes } from "@angular/router";
import { TransactionsComponent } from "./components/transactions-list/transactions.component";
import { NgModule } from "@angular/core";
import { TransactionInfoComponent } from "./components/transaction-info/transaction-info.component";

const routes:Routes = [
    {
        path:'transactions',
        component:TransactionsComponent,
        data:[
            {breadCrumbText:'TRANSACTIONS_LIST'}
        ]
    },
    {
        path:'transaction-info/:id',
        component:TransactionInfoComponent,
        data: [
            {breadCrumbText: 'TRANSACTION_INFO'}
        ]
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class TransactionsRouterModule {

}