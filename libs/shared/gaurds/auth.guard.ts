import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivateFn, Route, Router } from "@angular/router";

export const AuthGaurd:CanActivateFn = (route,state) =>  {
    const authService = inject(AuthService);
    const router  = inject(Router);

    if (!authService.userLoggedInCheck()) {
        router.navigateByUrl('/login');
        return false;
    } else {
        return true;
    }
}