import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { URL_CONFIG } from "libs/shared/configs/url-mapper";
import { CommonService } from "libs/shared/services/common.service";

@Component({
    selector:'lib-overview',
    templateUrl:'./overview.component.html'
})

export class OverviewComponent implements OnInit {
    transactionAmtOverTimeArr: Array<any> = [];
    transactionTimeRange: Array<any>      = [];
    transactionAndTaxArr: Array<any>      = [];
    transactionAndTaxTimeRange:Array<any> = [];
    taxAmtOverTimeArr: Array<any>         = [];
    transactionCountValueArr: Array<any>  = [];
    transactionCountTimeRange: Array<any> = [];
    transactionAjaxFired: boolean         = false;
    comparisionAjaxFired: boolean         = false;
    inventoryAjaxFired: boolean           = false;
    categoryWiseAjaxFired: boolean        = false;
    transactionCountAjaxFired: boolean    = false;
    inventoryQuantityArr:Array<any>       = [];
    inventoryQuantityLabel:Array<any>     = [];
    categorySaleAmount: Array<any>        = [];
    categoryLabels: Array<string>         = [];
    initialTransactionRange: number       = 5;
    initialTaxRange: number               = 5;
    initialCategorySalesRange: number     = 5;
    initialInventoryCategory: number      = 0;
    initialTransactionCountRange: number  = 5;
    transactionStartDate:any;
    transactionEndDate:any;

    constructor(
        private httpClient:HttpClient,
        private commonService: CommonService
    ){}

    ngOnInit(): void {
       this.getSelectedTimeRange(5, 'all');
       this.getInventoryQuantity();
       this.getSelectedTimeRange(this.initialCategorySalesRange, 'category');
       this.commonService.onTransactionTimeRangeChange$.subscribe((value)=> {
         if(value && value > 0) {
            this.initialTransactionRange = value;
            this.getSelectedTimeRange(value, 'transaction')
         }
       });
       this.commonService.onTaxTimeRangeChange$.subscribe((value)=> {
        if(value && value > 0) {
            this.initialTaxRange = value;
            this.getSelectedTimeRange(value, 'taxComparision')
        }
      });
      this.commonService.onInventoryCategoryChange$.subscribe((value)=> {
          this.initialInventoryCategory = value;
          this.getInventoryQuantity();
      });
      this.commonService.onCategoryTimeRangeChange$.subscribe((value)=> {
         if(value && value > 0) {
            this.initialCategorySalesRange = value;
            this.getSelectedTimeRange(value, 'categorySales');
         }
      });
      this.commonService.onTransactionCountTimeRangeChange$.subscribe((value)=> {
        if (value && value > 0) {
            this.initialTransactionCountRange = value;
            this.getSelectedTimeRange(value, 'transactionCount');
        }
      })
    }

    getSelectedTimeRange(num:number, type:string) {
        let today  = new Date();
        switch(num) {
            case 1:
                this.transactionEndDate   = today;
                this.transactionStartDate = new Date(this.transactionEndDate).setDate(this.transactionEndDate.getDate() - 6);
                break;
            case 2:
                this.transactionEndDate   = new Date(today).setDate(today.getDate() - 6);
                this.transactionStartDate = new Date(this.transactionEndDate).setDate(new Date(this.transactionEndDate).getDate() - 6);
                break;
            case 3:
                this.transactionEndDate   = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                this.transactionStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 4:
                this.transactionEndDate   = new Date(today.getFullYear(), today.getMonth(), 0);
                this.transactionStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                break;
            case 5:
                this.transactionEndDate   = today;
                this.transactionStartDate = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
                break;
            case 6:
                this.transactionEndDate   = today;
                this.transactionStartDate = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
                break;
            case 7:
                let currentYear           = today.getFullYear();
                this.transactionEndDate   = new Date(currentYear + 1, 0, 1);
                this.transactionStartDate = new Date(currentYear, 0 , 1);
                break;
            case 8:
                let lastYear              = today.getFullYear() - 1;
                this.transactionEndDate   = new Date(lastYear, 11, 31);
                this.transactionStartDate = new Date(lastYear, 0, 1);
                break;
        }
        type === 'all' || type === 'transaction' || type === 'taxComparision' ? this.getTransactionAmount(type) : '';
        type === 'categorySales' || type === 'all' ? this.getCategoryWiseSales() : '';
        type === 'transactionCount' || type === 'all' ? this.getTransactionCount(type) : '';
    }

    getCategoryWiseSales() {
        this.categoryWiseAjaxFired = true;
        let startDate = new Date(this.transactionStartDate);
        let endDate   = new Date(this.transactionEndDate);
        this.categorySaleAmount = [];
        this.categoryLabels     = [];
        this.httpClient.post(URL_CONFIG.getCategorySales, {startDate, endDate})
        .subscribe((data:any)=> {
            data['success'].map((item:any)=> {
                let tempObj = {
                    name: this.commonService.getCategoryName(item.category),
                    value: Number(item.totalPrice) + Number(item.totalTax)
                };
                this.categorySaleAmount.push(tempObj);
            })
            this.categoryWiseAjaxFired = false;
        },
        (err)=> {
            console.log(err);
            this.categoryWiseAjaxFired = false;
        })
    }

    getInventoryQuantity() {
        this.inventoryAjaxFired     = true;
        this.inventoryQuantityArr   = [];
        this.inventoryQuantityLabel = [];
        this.httpClient.get(URL_CONFIG.getInventoryQuant + this.initialInventoryCategory)
        .subscribe((data)=> {
            data['success'].map((item)=> {
                this.inventoryQuantityLabel.push(this.commonService.convertTotitleCase(item.itemName));
                this.inventoryQuantityArr.push(this.commonService.convertQuantityType(item.quantityRemaining, item.quantityType));
            })
            console.log(this.inventoryQuantityLabel, this.inventoryQuantityArr)
            this.inventoryAjaxFired = false;
        },
        (err)=> {
            this.inventoryAjaxFired = false;
            console.log(err)
        })
    }

    getTransactionCount(type:string) {
        this.transactionCountAjaxFired =  true;
        let startDate:any = new Date(this.transactionStartDate);
        let endDate: any  = new Date(this.transactionEndDate);
        this.httpClient.post(URL_CONFIG.getTransactionCount, {startDate,endDate})
        .subscribe((data)=> {
            let timeRange:any = [];
            let valArr:any    = [];
            data['success'].map((item:any)=> {
                timeRange.push(item.billedDate);
                valArr.push(item.transactions)
            })
            this.transactionCountValueArr = valArr;
            this.transactionCountTimeRange = this.commonService.getTimeLabelArray(startDate, endDate, timeRange);
            this.transactionCountAjaxFired = false;
        }, (err)=> {
            console.log(err);
            this.transactionCountAjaxFired = false;
        })
    }

    getTransactionAmount(type:string) {
        let startDate:any              = new Date(this.transactionStartDate);
        let endDate:any                = new Date(this.transactionEndDate);
        type === 'all' ? this.transactionAjaxFired = this.comparisionAjaxFired = true : (type === 'transaction' ? this.transactionAjaxFired = true : this.comparisionAjaxFired = true);
        this.httpClient.post(URL_CONFIG.getTransactionAmount, {startDate, endDate})
        .subscribe((data:any)=> {
            let transactionsArr:any = [];
            let taxArray:any        = [];
            let timeRangeArr:any    = [];
            data['success'].map((item:any) => {
                if (type === 'transaction') {
                    transactionsArr.push(Number(item.totalTax) + Number(item.totalPrice));
                    timeRangeArr.push(item.billedDate)
                } else if(type == 'all') {
                    transactionsArr.push(Number(item.totalTax) + Number(item.totalPrice));
                    taxArray.push(item.totalTax);
                    timeRangeArr.push(item.billedDate)
                }
                else {
                    transactionsArr.push(Number(item.totalTax) + Number(item.totalPrice));
                    taxArray.push(item.totalTax);
                    timeRangeArr.push(item.billedDate);
                }           
            }); 
            if (type === 'transaction') {
                this.transactionAmtOverTimeArr = transactionsArr;
                this.transactionTimeRange = this.commonService.getTimeLabelArray(startDate, endDate, timeRangeArr);
                this.transactionAjaxFired = false;
            } else if (type === 'all') {
                this.transactionAndTaxArr       = [transactionsArr, taxArray];
                this.transactionAmtOverTimeArr  = transactionsArr;
                this.transactionAndTaxTimeRange = this.commonService.getTimeLabelArray(startDate, endDate, timeRangeArr);
                this.transactionTimeRange       = this.commonService.getTimeLabelArray(startDate, endDate, timeRangeArr);
                this.comparisionAjaxFired       = this.transactionAjaxFired = false;
            } else {
                this.transactionAndTaxArr       = [transactionsArr, taxArray];
                this.transactionAndTaxTimeRange = this.commonService.getTimeLabelArray(startDate, endDate, timeRangeArr);
                this.comparisionAjaxFired       = false;
            }
        }, 
         (err)=> {
            this.comparisionAjaxFired = this.transactionAjaxFired = false;
            console.log(err)
         })
    }
}