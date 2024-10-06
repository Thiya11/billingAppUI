import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn:'root'
})

export class CommonService {

    constructor(private httpClient:HttpClient,
                private storageService:StorageService
    ) {}
    
    setMenuListUrls(urlList:any, siteAbbr:string) {
        return urlList.filter((urlItem:any)=> {
            if (urlItem.partners.some((item:any)=> item === siteAbbr) && urlItem.status == 1) {
                return true;
            }  
            return false;
        })
    }

    logOut() {
        this.storageService.deleteUserDetails();
        return true;
    }

    getCurrentTimeZone() {
       return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}