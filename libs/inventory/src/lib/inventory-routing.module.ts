import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGaurd } from "libs/shared/gaurds/auth.guard";
import { InventoryComponent } from "./components/inventory-list/inventory.component";

const routes:Routes = [
   {
    path:'inventory',
    component:InventoryComponent,
    canActivate:[AuthGaurd],
    data:[
        {breadCrumbText:'INVENTORY'}
    ]
   }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class InventoryRouting {}