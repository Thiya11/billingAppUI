import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'inventoryType'
})

export class InventoryTypePipe implements PipeTransform {
    transform(value: any, args) {
        if (args == 'category') {
          return value.toString().replace('1','Cake')
        }
        if (args == 'quantityType') {
         return value.replace('I', 'Item')
                     .replace('p', 'Piece')
        }
        return value;
    }
    
}