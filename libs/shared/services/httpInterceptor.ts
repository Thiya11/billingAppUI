import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthInteceptor implements HttpInterceptor{
    private baseUrl = ''

    constructor(private storageService:StorageService){
        this.baseUrl = this.storageService.mainConfigDetails.baseUrl;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let updatedUrl = req.url.startsWith('http') ? req.url : this.baseUrl+req.url;
        if (req.url !== 'login') {
            const token = this.storageService.tokenDetails;
            if (token) {
                req = req.clone({
                    url:updatedUrl,
                    setHeaders:{
                        "Authorization":token
                    }
                });
            } else {
                req = req.clone({url:updatedUrl})
            }
        } else {
            req = req.clone({url:updatedUrl});
        }
        
       return next.handle(req)
    }

}