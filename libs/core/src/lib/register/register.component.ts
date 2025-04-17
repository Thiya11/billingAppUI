import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SharedPasswordValidationComponent } from "libs/shared/components/password-validation/shared-password-validation.component";
import { URL_CONFIG } from "libs/shared/configs/url-mapper";
import { confirmPasswordValidator } from "libs/shared/validators/shared-error.validator";

@Component({
    selector:'lib-register',
    templateUrl:'./register.component.html'
})

export class RegisterComponent implements OnInit {

    registerForm:FormGroup;
    @ViewChild('fieldValidationPassword', {static:false}) fieldValidationComponent:SharedPasswordValidationComponent;

    constructor(
        private fb:FormBuilder,
        private httpClient:HttpClient,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initiateFormControls()
    }

    initiateFormControls() {
        this.registerForm = this.fb.group({
            firstName: this.fb.control('', Validators.required),
            lastName: this.fb.control('', Validators.required),
            email: this.fb.control('', Validators.required),
            password: this.fb.control('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/])[A-Za-z0-9 ~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/]{8,}$/
)]),
            confirmPassword:this.fb.control('',[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/])[A-Za-z0-9 ~`!@#$%^&*()_\-+={[}\]|\:;"'<,>.?\\/]{8,}$/
)])
        },
        {Validators:confirmPasswordValidator} as AbstractControlOptions)
    }

    get f() {
        return this.registerForm.controls
    }

    onSubmit() {
        if(this.registerForm.valid && this.f.password == this.f.confirmPassword) {
            let registerFormValue = this.registerForm.value;
            let reqObj = {
                firstName: registerFormValue.firstName,
                lastName: registerFormValue.lastName,
                email: registerFormValue.email,
                password: registerFormValue.password
            }
            this.httpClient.post(URL_CONFIG.registerUser, reqObj)
            .subscribe((data:any)=> {
                if(data.success) {
                    this.router.navigate(['login']);
                }
            }, err=> {
                console.log('Unable to register User', err);
            })
        }
        if(this.f.password != this.f.confirmPassword) {
            console.log('password mismatch error...')
        }
    }

    onValidatePassword(value) {
        if(value) {
            this.fieldValidationComponent.onValidatePassword(value);
        }
    }
}