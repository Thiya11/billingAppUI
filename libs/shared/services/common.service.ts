import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { MONTH_LIST, QUANTITY_CATEGORY_LIST, QUANTITY_TYPE_OPTIONS } from "../configs/general-values";
import { Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class CommonService {
    onTransactionTimeRangeChange:Subject<number> = new Subject();
    onTaxTimeRangeChange:Subject<number> = new Subject();
    onInventoryCategoryChange:Subject<number> = new Subject();
    onCategoryTimeRangeChange:Subject<number> = new Subject();
    onTransactionCountTimeRangeChange:Subject<number> = new Subject();
    onTransactionTimeRangeChange$ = this.onTransactionTimeRangeChange.asObservable();
    onTaxTimeRangeChange$ = this.onTaxTimeRangeChange.asObservable();
    onInventoryCategoryChange$ = this.onInventoryCategoryChange.asObservable();
    onCategoryTimeRangeChange$ = this.onCategoryTimeRangeChange.asObservable();
    onTransactionCountTimeRangeChange$ = this.onTransactionCountTimeRangeChange.asObservable();

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

    getTimeLabelArray(startDate:Date, endDate:Date, timeRangeArr:Array<string>) {
        let dateDifference = Math.floor(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        let tempArr:any    = [];
        if (dateDifference < 60) {
            tempArr = timeRangeArr.map((item) => {
                let timeObj       = new Date(item);
                let day           = timeObj.getDate().toString().padStart(2, '0');
                let month         = MONTH_LIST[timeObj.getMonth()]; 
                return `${day}-${month}`
            });
        } else {
           tempArr = timeRangeArr.map((item)=> {
              let dateArr        = item.split(',');
              let weekStartDate  =  new Date(Number(dateArr[1]), 0, (1 + (Number(dateArr[0]) - 1) * 7));
              let calculatedDate =  new Date(weekStartDate).setDate(weekStartDate.getDate() + 6);
              let weekEndDate    = new Date(calculatedDate);
              let formatStart    = weekStartDate.getDate().toString().padStart(2, '0') + ' ' + MONTH_LIST[weekStartDate.getMonth()];
              let formatEnd      = weekEndDate.getDate().toString().padStart(2, '0') + ' ' + MONTH_LIST[weekEndDate.getMonth()];
              return `${formatStart} - ${formatEnd}`
           })
        }
        return tempArr; 
    };

    convertTotitleCase(str:string) {
        let strLowerCase = str.toLowerCase().split(' ');
        let convertedStr = strLowerCase.map((item)=> {
           return item[0].toUpperCase() + item.substring(1, item.length);
        })
        return convertedStr.join(' ');
    }

    convertQuantityType(qunatity:number, type:string) {
        return qunatity + ' ' + QUANTITY_TYPE_OPTIONS.filter((item)=> item.value === type)[0].label;
    }

    getCategoryName(category:number) {
        return QUANTITY_CATEGORY_LIST.filter((item)=> item.value === category)[0].label;
    }
}