import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'arrValueFinder'
})

export class ArrayValueFinder implements PipeTransform {

    transform(value: any, args: any[], type:string) {
       if(type == 'role') {
        return args.filter(item => item.value == value)[0].label
       }
       return value;
    }

}