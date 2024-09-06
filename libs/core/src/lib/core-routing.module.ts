import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { OverviewComponent } from "./overview/overview.component";
import { AuthGaurd } from "libs/shared/gaurds/auth.guard";
import { RegisterComponent } from "./register/register.component";
import { IsLoggedInGaurd } from "libs/shared/gaurds/isLoggedIn.guard";

const routes:Routes = [
    {
        path:'',
        redirectTo:'/overview',
        pathMatch:'full',
    },
    {
        path:'overview',
        component:OverviewComponent,
        canActivate:[AuthGaurd],
        data:[
            {breadCrumbText:'OVERVIEW'}
        ]
    },
    {
    path:'login',
    component:LoginComponent,
    canActivate:[IsLoggedInGaurd],
    data:[
        {breadCrumbText:'LOGIN'}
    ]
    },
    {
        path:'register',
        component:RegisterComponent,
        canActivate:[IsLoggedInGaurd],
        data:[
            {breadCrumbText:'REGISTER'}
        ]
    },
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class CoreRouterModule {}