import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserModel } from "../../models/user.model";
import { EXISTING_ROLES } from "libs/shared/configs/general-values";

@Component({
    selector:'lib-user-info',
    templateUrl:'./user-info.component.html'
})

export class UserInfoComponent implements OnInit {
    @Input() data:any;
    public userForm: FormGroup;
    public userModel: UserModel;
    public addOrEdit: string;
    public userModalTitle: string;
    public rolesList = EXISTING_ROLES;

    constructor(
        public activeModal:NgbActiveModal,
        private fb:FormBuilder
    ){}

    ngOnInit(): void {
        this.addOrEdit      = this.data.addOrEdit;
        this.userModalTitle = this.data.userModalTitle;
        this.userModel      = this.data.userModel;
        this.initiateFormControls()
        if(this.addOrEdit == 'Add') {
            this.userForm.addControl('password',this.fb.control('', Validators.required),{emitEvent:false});
            this.userForm.addControl('confirmPassword', this.fb.control('', Validators.required),{emitEvent:false});
            this.userForm.removeControl('userId',{emitEvent:false});
        } else {
            this.userForm.removeControl('password',{emitEvent:false});
            this.userForm.removeControl('confirmPassword',{emitEvent:false});
            this.userForm.addControl('userId', this.fb.control('',Validators.required),{emitEvent:false})
            this.setFormValues()
        }
    }

    setFormValues() {
        this.userForm.controls.userId.setValue(this.userModel.userId,{emitEvent:false});
        this.userForm.controls.firstName.setValue(this.userModel.firstName,{emitEvent:false});
        this.userForm.controls.lastName.setValue(this.userModel.lastName,{emitEvent:false});
        this.userForm.controls.email.setValue(this.userModel.email,{emitEvent:false});
        this.userForm.controls.roleId.setValue(this.userModel.roleId,{emitEvent:false});
    }

    initiateFormControls() {
        this.userForm = this.fb.group({
            firstName: this.fb.control('',Validators.required),
            lastName: this.fb.control('',Validators.required),
            email: this.fb.control('',Validators.required),
            roleId: this.fb.control(null,Validators.required)
        });

        this.userForm.valueChanges.subscribe((formData)=> {
            this.userModel.firstName = formData.firstName;
            this.userModel.lastName  = formData.lastName;
            this.userModel.email     = formData.email;
            this.userModel.password  = formData.password;
            this.userModel.roleId    = formData.roleId;
        })
    }

    get f() {
        return this.userForm.controls;
    }

    onCloseModal() {
        this.activeModal.dismiss()
    }

    onSubmit() {
        if(this.userForm.valid) {
            this.activeModal.close(this.userModel)
        }
    }

    
}