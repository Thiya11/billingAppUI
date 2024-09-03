import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthInteceptor } from "./services/httpInterceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ArrayValueFinder } from "./pipes/arrValueFinder.pipe";
import { ValidatorErrorMessage } from "./validators/shared-error.validator";

@NgModule({
    imports:[
        CommonModule   
    ],
    declarations:[
        ArrayValueFinder
    ],
    providers:[
        {
            provide:HTTP_INTERCEPTORS, useClass:AuthInteceptor,multi:true
        }
    ],
    exports:[
        ArrayValueFinder
    ]
})

export class SharedModule{}