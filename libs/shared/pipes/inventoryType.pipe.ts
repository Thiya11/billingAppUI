import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'inventoryType'
})

export class InventoryTypePipe implements PipeTransform {
    transform(value: any) {
        return value.replace('I', 'Item')
    }
    
}