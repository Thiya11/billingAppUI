import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "libs/shared/gaurds/auth.guard";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { SettingsBaseComponent } from "./components/settings-base/settings-base.component";
import { RolesListComponent } from "./components/roles-list/roles-list.component";

const routes:Routes = [
    {
        path:'settings',
        component:SettingsBaseComponent,
        canActivate:[AuthGaurd],
        data:[
            {breadCrumbText:'SETTINGS_BASE'}
        ],
        children:[
            {
                path:'',
                redirectTo:'users-list',
                pathMatch:'full'
            },
            {
                path:'users-list',
                component:UsersListComponent,
                canActivate:[AuthGaurd],
                data:[
                    {breadCrumbText:'USERS_LIST'}
                ]
            },
            {
                path:'roles-list',
                component:RolesListComponent,
                canActivate:[AuthGaurd],
                data:[{
                    breadCrumbText:"ROLES_LIST"}
                ]
            }
        ]
    }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class SettingsRoutingModule {}