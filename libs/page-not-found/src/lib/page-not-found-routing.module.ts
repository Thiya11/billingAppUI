import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGaurd } from "libs/shared/gaurds/auth.guard";
import { PageNotFoundComponent } from "./page-not-found.component";

const routes:Routes = [
   {
    path:'**',
    pathMatch:"full",
    component:PageNotFoundComponent,
    canActivate:[AuthGaurd],
    data:[
        {breadCrumbText:'404'}
    ]
   }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class PageNotFoundRouting {}