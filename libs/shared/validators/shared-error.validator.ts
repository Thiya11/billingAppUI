import { Component, Directive, HostListener, Input } from "@angular/core";
import { AbstractControl, AbstractControlDirective, FormControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn, Validators } from "@angular/forms";

@Component({
    selector:'shared-error',
    template:`
    <div class="error-text" *ngIf="formControlRef && formControlRef.dirty && formControlRef.errors">
        {{listOfErrors()}}
    </div>`
})

export class ValidatorErrorMessage {
    private static readonly errorMessages:any = {
        'required': (params:any,name:any) => name + ' is required',
        'email':(params:any,name:any) => 'Valid email is required (eg: example@gmail.com).' 
    }
    @Input() name: string;
    @Input() formControlRef: any;
    
    listOfErrors():string[] {
        let field = Object.keys(this.formControlRef.errors)[0];
        return this.getMessage(field,this.formControlRef.errors[field],this.name)
    }

    private getMessage(type:any,params:any,name:any) {
        if (ValidatorErrorMessage.errorMessages.hasOwnProperty(type)) {
            return ValidatorErrorMessage.errorMessages[type](params,name)
        }
    }

    
} 

@Directive({
    selector:'form',
    providers: [{ provide: NG_VALIDATORS, useExisting: formValidator, multi: true }]
})

export class formValidator implements Validator {
    private formGroup: FormGroup;
    @HostListener('submit', ['$event'])
    ngSubmit(){
      if (this.formGroup && this.formGroup['controls'])
        Object.keys(this.formGroup['controls']).forEach((key) => {
          const control = this.formGroup.get(key)
          if(control instanceof FormGroup) {
            Object.keys(control['controls']).forEach((innerKey)=> {
                control['controls'][innerKey].markAsDirty();
                control['controls'][innerKey].markAsTouched();
            })
          }
          this.formGroup['controls'][key].markAsDirty();
          this.formGroup['controls'][key].markAsTouched();
        });
    }
    @HostListener('document:setDirty', ['$event','$event.detail'])
    displayFormValidation(event:any,formGroup:any){
      if (formGroup && formGroup['controls'])
        Object.keys(formGroup['controls']).forEach(key => {
          if(Array.isArray(formGroup['controls'][key]['controls'])){
            for(let formgroup of formGroup['controls'][key]['controls']){
              Object.keys(formgroup['controls']).forEach(insidekey=>{
                formgroup['controls'][insidekey].markAsDirty();
                formgroup['controls'][insidekey].markAsTouched();
              })
            }
          }
          if (formGroup['controls'][key]['controls']) {
            Object.keys(formGroup['controls'][key]['controls']).forEach(innerkey => {
              formGroup['controls'][key]['controls'][innerkey].markAsDirty();
              formGroup['controls'][key]['controls'][innerkey].markAsTouched();
            });
          }
          formGroup['controls'][key].markAsDirty();
          formGroup['controls'][key].markAsTouched();
        });
    }

    validate(Form:FormGroup): ValidationErrors | null {
        this.formGroup = Form;
        return null;
    }
}

export const confirmPasswordValidator: ValidatorFn =  (c:AbstractControl) : ValidationErrors | null  => {
  if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
    return {passwordMatchError:true};
  }
  return null;
}