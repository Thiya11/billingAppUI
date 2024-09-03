import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ValidatorErrorMessage, formValidator } from "../validators/shared-error.validator";

@NgModule({
    imports:[CommonModule],
    declarations:[ValidatorErrorMessage,formValidator],
    exports:[ValidatorErrorMessage,formValidator],
    providers:[]
})

export class SharedValidatorsModule {

}