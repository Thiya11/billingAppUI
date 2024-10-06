export class InventoryModal {
    public itemId?: number;
    public itemName: string;
    public category: number;
    public pricePerItem: number;
    public quantityType: any;
    public taxes: number;
    public quantityRemaining: number; 
    public isEdit?:boolean;

    constructor() {
        this.itemName     = ''
        this.pricePerItem = this.quantityRemaining = this.taxes = this.category = NaN;
        this.quantityType = null
    }
}