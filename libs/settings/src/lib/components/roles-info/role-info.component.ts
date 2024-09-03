import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, Input, NgZone, OnInit, Renderer2 } from "@angular/core";
import { RoleModel } from "../../models/role.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector:'lib-role-info',
    templateUrl:'./role-info.component.html'
})

export class RoleInfoComponent implements OnInit {
    @Input() data:any;
    public roleForm: FormGroup;
    public roleModel: RoleModel;
    public addOrEdit: string;
    public roleModalTitle: string;

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initiateFormControls();
        this.addOrEdit      = this.data.addOrEdit;
        this.roleModalTitle = this.data.roleModalTitle;
        this.roleModel      = this.data.roleModel;
        this.addOrEdit == 'Edit' ? this.roleForm.addControl('roleId', new FormControl(''),{emitEvent:false}) : this.roleForm.removeControl('roleId');
        if (this.addOrEdit == 'Edit') {
            this.roleForm.controls.roleId.setValue(this.roleModel.roleId,{emitEvent:false});
            this.roleForm.controls.roleName.setValue(this.roleModel.roleName,{emitEvent:false});
            this.roleForm.controls.status.setValue(String(this.roleModel.status))
        }
    }

    initiateFormControls() {
        this.roleForm = this.fb.group({
            roleName: this.fb.control('',Validators.required),
            status: this.fb.control(1,Validators.required)
        })

        this.roleForm.valueChanges.subscribe((formData)=> {
            this.roleModel.roleName  = formData.roleName;
            this.roleModel.status    = formData.status
        })
    }

    get f() {
        return this.roleForm.controls;
    }

    onCloseModal() {
        this.activeModal.dismiss()
    }

    onSubmit() {
        this.activeModal.close(this.roleModel)
    }



}