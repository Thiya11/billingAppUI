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

    getCurrentTimeZoneTime(billDate) {
       let dateTime                =  new Date(billDate).toLocaleString(undefined).split(', ');
       let [timeFormatted, period] =  dateTime[1].split(' ')
       let [hours, minutes]        = timeFormatted.split(':')
       hours                       = Number(hours) < 10 ? '0' + hours : hours;
       return {
         date: dateTime[0],
         time: hours + ':' + minutes + ' ' + period.toUpperCase()
       }
    }
}