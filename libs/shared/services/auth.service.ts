import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class AuthService {
    
    userLoggedInCheck() {
        return sessionStorage.getItem('auth_token') != null && sessionStorage.getItem('auth_token') != '' && sessionStorage.getItem('auth_token') != undefined;
    }
}