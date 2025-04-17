import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'inventoryType'
})

export class InventoryTypePipe implements PipeTransform {
    transform(value: any, args) {
        if (args == 'category') {
          return value.toString().replace('1','Cake')
                                 .replace('2', 'Others')
                                 .replace('3', 'Diary')
        }
        if (args == 'quantityType') {
         return value.replace('I', 'Item')
                     .replace('p', 'Piece')
                     .replace('kg', 'Kilo')
                     .replace('L', 'Litre')
        }
        return value;
    }
    
}