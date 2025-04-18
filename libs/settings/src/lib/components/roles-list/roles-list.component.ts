import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ERROR_MESSAGES } from "libs/shared/configs/general-values";
import { URL_CONFIG } from "libs/shared/configs/url-mapper";
import { RoleModel } from "../../models/role.model";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { RoleInfoComponent } from "../roles-info/role-info.component";

@Component({
    selector:'lib-roles-list',
    templateUrl:"roles-list.component.html"

})
export class RolesListComponent implements OnInit{
    public roleModel:RoleModel
    public rolesListData:any = [];
    public apexFired:boolean = false;
    public showNoDataError:boolean = false;
    public roleErrorMessage:any = ERROR_MESSAGES.roleErrorMessage;
    public roleModalTitle: string = '';
    public addOrEdit: string = '';
    public modalRef:NgbModalRef;
    
    constructor(
        private httpClient: HttpClient,
        private modalService: NgbModal    
    ){}

    ngOnInit(): void {
        this.apexFired = true;
        this.getRoles()
    }

    getRoles() {
        this.httpClient.get(URL_CONFIG.rolesList)
        .subscribe((data:any)=> {
         this.showNoDataError = data['success'].length == 0 || !data['success'];
         this.apexFired = false;
         this.rolesListData = data['success'];
        },
        err=>{
         this.apexFired = false;
         this.showNoDataError = true;
        })
    }

    onShowRolePopup(addOrEdit:string, person?:any) {
        if (addOrEdit === 'add') {
            this.roleModel      = new RoleModel();
            this.roleModalTitle = 'Add New Role';
            this.addOrEdit      = 'Add';
            this.openModel(); 
        }
        if (addOrEdit == 'edit') {
            this.roleModel      = JSON.parse(JSON.stringify(person));
            this.roleModalTitle = 'Edit Role';
            this.addOrEdit      = 'Edit';
            this.openModel(person);
        }
    }

    openModel(person?:any) {
        this.modalRef = this.modalService.open(RoleInfoComponent);
        let data = {};
        data['addOrEdit']      = this.addOrEdit;
        data['roleModalTitle'] = this.roleModalTitle;
        data['roleModel']      = this.addOrEdit == 'Edit' ? person : this.roleModel;
        this.modalRef.componentInstance.data = data;

        this.modalRef.result
        .then(roleObj=> {
            this.submitNewRole(roleObj, this.addOrEdit);
        })
        .catch(err=> {
            if(err) console.log(err)
        })
    }

    submitNewRole(roleObj:RoleModel, addOrEdit:string) {
        let reqObj = {
            roleName: roleObj.roleName,
            status: roleObj.status,
        };
        let url = addOrEdit == 'Edit' ? URL_CONFIG.updateRole + roleObj.roleId : URL_CONFIG.addRole; 
            this.httpClient.put(url,reqObj)
            .subscribe((data:any)=> {
                if (data.success) {
                    this.getRoles()
                }
            }, err => {
                console.log(err)
            })
    }

    ondeleteRole(roleId:any) {
        this.httpClient.delete(URL_CONFIG.deleteRole + roleId)
        .subscribe((data:any)=> {
            if(data.success) {
                this.getRoles()
            }
        }, err => {
            console.log(err);
        })
    }
}