import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URL_CONFIG } from 'libs/shared/configs/url-mapper';
import { InventoryModal } from '../../inventory-modal';
import { INVENTORY_VISIBLE_FIELDS, QUANTITY_TYPE_OPTIONS } from 'libs/shared/configs/general-values';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InventoryInfoComponent } from '../inventory-info/inventory-info.component';

@Component({
  selector: 'lib-inventory',
  templateUrl:'./inventory.component.html'
})
export class InventoryComponent implements OnInit {

  public inventoryList:Array<InventoryModal> = [];
  public visibleFields = INVENTORY_VISIBLE_FIELDS;
  public quantityTypeOptions = QUANTITY_TYPE_OPTIONS;
  public errorString:Array<any> = [];
  public errorMap:any;
  public searchTerm:string;
  public elementRef:NgbModalRef;
  public errorOrderMap = new Map(
    [
      ['Inventory Name', 1],
      ['Price Per Item', 2],
      ['Quantity Type', 3],
      ['Tax', 4],
      ['Quantity Remaining', 5]
    ]
  )

   constructor(
    private httpClient: HttpClient,
    private toasterService: ToastrService,
    private ngbModal: NgbModal
   ) {}
  
   ngOnInit(): void { 
     this.getInventoryItems()
     this.setErrorMap()
   }

   setErrorMap() {
     this.errorMap = new Map ([
      ['itemName', 'Inventory Name'],
      ['pricePerItem', 'Price Per Item'],
      ['quantityType', 'Quantity Type'],
      ['taxes', 'Tax'],
      ['quantityRemaining', 'Quantity Remaining']
     ])
   }

   onShowInventoryModal() {
       this.elementRef =  this.ngbModal.open(InventoryInfoComponent);
       this.elementRef.result
       .then((value)=> {
         if (value.message == 'success')
           this.getInventoryItems()
       })
       .catch((err) => {
        console.log(err)
       })
   }

   getInventoryItems() {
     this.httpClient.get(URL_CONFIG.getInventory).subscribe((data)=> {
       this.inventoryList = data['success'];
     }, 
    (err)=> {
      console.log(err)
    })
   }

   onEditInventory(id:number, type = 'Edit') {
    this.inventoryList = this.inventoryList.filter((item)=> {
      if(item.itemId == id) {
        item.isEdit = !item.isEdit;
      }
      if (type == 'cancel') {
        this.getInventoryItems();
      }
      return item;
    });
   }

   validateMissingFields(obj:any) {
    this.errorString = [];
     for(let item in obj) {
       if(obj[item] == '' || obj[item] == null) {
         this.errorString.push(this.errorMap.get(item));
       }
     }
   }

   onSubmit(inventory:any) {
    this.validateMissingFields(inventory);
    if (this.errorString.length > 0) {
      this.toasterService.error('Following fields are missing: ' + this.errorString.join(',') , 'Error')
    } else {
      let requestObj = {...inventory};
      delete requestObj['itemId'];
      delete requestObj['isEdit'];
      this.httpClient.put(URL_CONFIG.addInventory + '/' + inventory.itemId, requestObj)
      .subscribe((data)=> {
        this.toasterService.success(data['success'], 'Success')
        this.getInventoryItems()
      },
      (err) => {
        console.log(err);
      })
    }
   }

   onDeleteInventory(id:number) {
     this.httpClient.delete(URL_CONFIG.deleteInventory + id)
     .subscribe((data)=> {
        this.toasterService.success(data['success'], 'Success');
        this.getInventoryItems()
     },
     err => {
      console.log(err)
     })
   }
}
