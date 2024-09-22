import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:"searchPipe"
})

export class SearchPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
       if (args[1] = 'inventory' && args[0]) {
        return value.filter((inventory) => {
            if(inventory.itemId.toString().includes(args[0]?.toString()) || inventory.itemName.includes(args[0])) {
                return inventory;
            }
        });
       }
       return value;
    }
    
}