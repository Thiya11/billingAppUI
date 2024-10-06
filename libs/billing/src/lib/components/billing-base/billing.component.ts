import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { URL_CONFIG } from 'libs/shared/configs/url-mapper';
import { BillItemModal } from '../../modals/bill-item.modal';
import { StorageService } from 'libs/shared/services/storage.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BillingSummaryComponent } from '../billing-summary/billing-summary.component';

@Component({
  selector: 'lib-billing',
  templateUrl:'./billing.component.html',
  styles: [
  ]
})
export class BillingComponent implements OnInit {

  public selectedItemsArr: Array<any> = [];
  public inventoryList: Array<any> = [];
  public totalPrice: number = 0;
  public totalTaxes: number = 0;
  public totalAmountPayable: number = 0;
  public availableBillingKeys = ['Item Id', 'Item Name', 'Category Id', 'Price Per Quantity', 'Quantity Type', 'Tax(%)', 'Quantity', 'Price', 'Quick Actions'];
  public billInfo:any;
  public elementRef:NgbModalRef;
  
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private ngbModal: NgbModal
  ){}

  ngOnInit(): void {
    this.httpClient.get(URL_CONFIG.getInventory)
    .subscribe((data:any)=> {
      this.inventoryList = data.success;
    },
    err => {
      console.log(err);
    })
    
  }

  onInventoryChange(inventory:any) {
    let selectedItem: BillItemModal = {
      itemId: inventory.itemId,
      itemName: inventory.itemName,
      categoryId: inventory.category,
      pricePerItem: inventory.pricePerItem,
      quantityType: inventory.quantityType,
      taxes: inventory.taxes,
      quantity: this.quantityAdder(inventory.quantityType),
      price: this.quantityAdder(inventory.quantityType) * inventory.pricePerItem 
    };
    if (this.selectedItemsArr.length) {
      if(!this.selectedItemsArr.some(bilItem => bilItem.itemId === selectedItem.itemId)) this.selectedItemsArr.push(selectedItem)
    } else {
      this.selectedItemsArr.push(selectedItem)
    }
    this.billCalculations()
  }

  quantityAdder(quantityType) {
    let quantity = 0;
     switch(quantityType) {
      case 'I':
        quantity = 1;
        break;
      case 'Kg':
        quantity = 1;
        break;
      case 'L':
        quantity = 0.1;
        break;
      default:
        quantity = 1;
        break;
     }
     return quantity;
  }

  billCalculations() {
    this.totalPrice = this.totalTaxes = 0;
    for (let item of this.selectedItemsArr) {
      let itemTotalPrice = item.pricePerItem * item.quantity;
      let itemTotalTaxes = itemTotalPrice * (item.taxes / 100);
      
      this.totalPrice += itemTotalPrice;
      this.totalTaxes += itemTotalTaxes;
    }
    this.totalTaxes         = Math.round(this.totalTaxes * 100) / 100;
    this.totalAmountPayable = this.totalPrice + this.totalTaxes; 
  }

  onAddQuantity(itemId) {
    this.selectedItemsArr.map((item)=> {
      if (item.itemId === itemId) {
        item.quantity += 1;
        this.billCalculations();
      }
    })
  }

  onReduceQuantity(itemId) {
    this.selectedItemsArr.map((item)=> {
      if (item.itemId === itemId && item.quantity > 1) {
        item.quantity -= 1;
        this.billCalculations();
      }
    })
  }

  onDeleteQuantity(itemId) {
    this.selectedItemsArr = this.selectedItemsArr.filter((item) => item.itemId !== itemId);
    this.billCalculations();
  }

  purchasedItemsSummary() {
    let purchasedItems:any = [];
     this.selectedItemsArr.forEach((selectedItem) => {
       let tempObj = {
        'itemId' : selectedItem.itemId,
        'quantity': selectedItem.quantity,
        'price': selectedItem.quantity * selectedItem.pricePerItem,
        'tax': Math.round((selectedItem.quantity * selectedItem.pricePerItem * (selectedItem.taxes / 100)) * 100) /100
       }
       purchasedItems.push(tempObj);
     })
     return purchasedItems;
  }

  openBillSummaryModal() {
    this.elementRef = this.ngbModal.open(BillingSummaryComponent);
    this.elementRef.componentInstance.billData = this.billInfo['success'];
  }

  getBillInfo(billId) {
    this.httpClient.get(URL_CONFIG.getBillInfo + billId)
    .subscribe((item) => {
      this.billInfo = item;
      this.openBillSummaryModal()
    },
    err => {
      console.log(err)
    })
  }

  onSubmitBill() {
     let postData = {
      'userId': this.storageService.userDetails.id,
      'totalPrice': this.totalPrice,
      'totalTax': this.totalTaxes,
      'billDate': new Date(),
      'purchasedItems': this.purchasedItemsSummary()
     }
     this.httpClient.post(URL_CONFIG.addnewBill, postData)
     .subscribe((data:any)=> {
      let billId = data['success']['billId'];
      if (billId > 0) {
        this.getBillInfo(billId)
      }
     },
     (err) => {
       console.log('Something went wrong')
     })
  }

}
