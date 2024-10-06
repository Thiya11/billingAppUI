import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { InventoryModal } from "../../inventory-modal";
import { QUANTITY_CATEGORY_LIST, QUANTITY_TYPE_OPTIONS } from "libs/shared/configs/general-values";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient } from "@angular/common/http";
import { URL_CONFIG } from "libs/shared/configs/url-mapper";

@Component({
    selector:'lib-inventory-info',
    templateUrl:'./inventory-info.component.html'
})

export class InventoryInfoComponent implements OnInit{

    public inventoryModalTitle = 'Add Inventory';
    public inventoryForm:FormGroup;
    public inventoryModal:InventoryModal;
    public quantityTypeList:Array<any> = QUANTITY_TYPE_OPTIONS;
    public categoryList: Array<any> = QUANTITY_CATEGORY_LIST;
    public selectedQuantity: string;

    constructor(
        private fb:FormBuilder,
        private activeModal:NgbActiveModal,
        private httpClient: HttpClient
    ) {}

    ngOnInit(): void {
       this.initiateFormControls()
    }

    initiateFormControls() {
        this.inventoryModal = new InventoryModal();
        this.inventoryForm = new FormGroup({
            itemName: new FormControl('', [Validators.required]),
            category: new FormControl(null, [Validators.required]),
            pricePerItem: new FormControl('',[Validators.required]),
            quantityType: new FormControl(null, [Validators.required]),
            taxes: new FormControl('', [Validators.required]),
            quantityRemaining: new FormControl('', [Validators.required])
        });

        this.inventoryForm.valueChanges.subscribe((formData) => {
            this.inventoryModal.itemName          = formData.itemName;
            this.inventoryModal.category          = formData.category;
            this.inventoryModal.pricePerItem      = formData.pricePerItem;
            this.inventoryModal.quantityType      = formData.quantityType;
            this.inventoryModal.taxes             = formData.taxes;
            this.inventoryModal.quantityRemaining = formData.quantityRemaining;
            
            if (formData.quantityType != null) {
                this.selectedQuantity = this.quantityTypeList.filter(quantity => quantity.value === formData.quantityType)[0].label;
            }
        })
    }

    get f() {
        return this.inventoryForm.controls
    }


    onCloseModal() {
        this.activeModal.dismiss()
    }

    onSubmit() {
        if(this.inventoryForm.valid) {
            let requestObj = {...this.inventoryModal};
            delete requestObj['itemId'];
            delete requestObj['isEdit'];

            this.httpClient.post(URL_CONFIG.addInventory, requestObj).subscribe((data)=> {
                this.activeModal.close({'message':'success'})
            },
           (err) => {
             console.log(err)
           })
        }
    }

}