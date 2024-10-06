import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { URL_CONFIG } from "libs/shared/configs/url-mapper";
import { CommonService } from "libs/shared/services/common.service";

@Component({
    selector:'lib-billing-summary',
    templateUrl: './billing-summary.component.html'
})

export class BillingSummaryComponent implements OnInit {

    public summaryFields = ['Id', 'Item Name', 'Price Per Quantity', 'Quantity', 'Price'];
    public billTime: any;
    public purchasedItems: Array<any> = [];
    public totalAmount: number;
    @Input() billData:any;

    constructor(
        private httpClient: HttpClient,
        public activeModal: NgbActiveModal,
        private commonService: CommonService
    ){}
    
    ngOnInit(): void {
        this.billTime       = new Date(this.billData.billDate).toLocaleString('en-IN', {timeZone:this.commonService.getCurrentTimeZone()}).split(',');
        this.purchasedItems = this.billData.purchasedItems; 
        this.totalAmount    = Number(this.billData.totalTax) + Number(this.billData.totalPrice);
    }

}