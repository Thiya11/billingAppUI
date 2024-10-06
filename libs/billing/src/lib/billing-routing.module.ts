import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGaurd } from "libs/shared/gaurds/auth.guard";
import { BillingComponent } from "./components/billing-base/billing.component";

const routes:Routes = [
   {
    path:'bill-generator',
    component:BillingComponent,
    canActivate:[AuthGaurd],
    data:[
        {breadCrumbText:'BILL_GENERATOR'}
    ]
   }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class BillRoutingModule {}