import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'lib-forgot-reset-password',
    templateUrl:'./forgot-reset-password.component.html'
})

export class ForgotResetPasswordComponent {

    constructor(private router:Router){
        console.log(this.router.routerState)
    }
}