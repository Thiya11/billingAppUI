import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TRANSACTION_INFO_VISIBLE_FIELDS } from "libs/shared/configs/general-values";
import { CommonService } from "libs/shared/services/common.service";

@Component({
    selector:'lib-transaction-info',
    templateUrl:'./transaction-info.component.html'
})

export class TransactionInfoComponent implements OnInit {
    public billDetails: any;
    public dateTime: any;
    public availableHeaders = TRANSACTION_INFO_VISIBLE_FIELDS;
    public totalAmountPaid:number;

    constructor(
        private router: Router,
        private commonService: CommonService
    ){
        const navigation     = this.router.getCurrentNavigation();
        this.billDetails     = navigation?.extras.state;
        this.dateTime        = this.commonService.getCurrentTimeZoneTime(this.billDetails.billDate);
        this.totalAmountPaid = Math.floor((Number(this.billDetails.totalPrice) + Number(this.billDetails.totalTax)) * 100) / 100; 
    }

    ngOnInit(): void {
        console.log(this.billDetails)
    }

}