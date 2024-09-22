import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthInteceptor } from "./services/httpInterceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ArrayValueFinder } from "./pipes/arrValueFinder.pipe";
import { ValidatorErrorMessage } from "./validators/shared-error.validator";
import { InventoryTypePipe } from "./pipes/inventoryType.pipe";
import { ToastrModule } from "ngx-toastr";
import { SearchPipe } from "./pipes/search.pipe";

@NgModule({
    imports:[
        CommonModule
    ],
    declarations:[
        ArrayValueFinder,
        InventoryTypePipe,
        SearchPipe
    ],
    providers:[
        {
            provide:HTTP_INTERCEPTORS, useClass:AuthInteceptor,multi:true
        }
    ],
    exports:[
        ArrayValueFinder,
        InventoryTypePipe,
        SearchPipe
    ]
})

export class SharedModule{}