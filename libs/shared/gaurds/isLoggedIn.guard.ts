import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { CanActivateFn, Router } from "@angular/router";

export const IsLoggedInGaurd:CanActivateFn = (route,state) =>  {
    const authService = inject(AuthService);
    const router  = inject(Router);

    if(authService.userLoggedInCheck() && (state.url == '/register' || state.url == '/login')) {
        router.navigate(['/overview']);
        return false;
    }
    return true;
}