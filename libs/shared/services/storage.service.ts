import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class StorageService {
    public _CONFIGS: any;
    public _FOOTER_CONFIGS:any;
    constructor() {}

    get mainConfigDetails() {
        return this._CONFIGS;
    }

    set mainConfigDetails(configDetails:any) {
       this._CONFIGS = configDetails
    }

    get footerConfigDetails() {
       return this._FOOTER_CONFIGS;
    }

    set footerConfigDetails(configDetails:any) {
       this._FOOTER_CONFIGS = configDetails;
    }

    set tokenDetails(token:any) {
        sessionStorage.setItem('auth_token',token);
    }

    get tokenDetails() {
        return sessionStorage.getItem('auth_token')
    }

    set userDetails(userDetails:any) {
        sessionStorage.setItem('user_details', this.hashifyObjData(userDetails))
    }

    get userDetails() {
        return this.stringifyHash(sessionStorage.getItem('user_details'))
    }

    deleteUserDetails() {
        sessionStorage.removeItem('user_details');
        sessionStorage.removeItem('auth_token');
    }

    hashifyObjData(obj:any) {
        return btoa(JSON.stringify(obj));
    }

    stringifyHash(str:any) {
        return JSON.parse(atob(str));
    }
}