import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ERROR_MESSAGES, EXISTING_ROLES } from "libs/shared/configs/general-values";
import { URL_CONFIG } from "libs/shared/configs/url-mapper";
import { StorageService } from "libs/shared/services/storage.service";
import { UserModel } from "../../models/user.model";
import { UserInfoComponent } from "../user-info/user-info.component";

@Component({
    selector:'lib-users-list',
    templateUrl:"users-list.component.html"

})
export class UsersListComponent implements OnInit{
    public usersListData:any = [];
    public apexFired:boolean = false;
    public showNoDataError:boolean = false;
    public userErrorMessage:string = ERROR_MESSAGES.userErrorMessage;
    public userDetails:any;
    public roles = EXISTING_ROLES;
    public elementRef:NgbModalRef;
    public addOrEdit:string;
    public userModalTitle:string;
    public userModel:UserModel

    constructor(private httpClient:HttpClient,
                private ngbModal:NgbModal,
                private storageService:StorageService
    ){
        this.userDetails = this.storageService.userDetails;
    }

    ngOnInit(): void {
        this.apexFired = true;
        this.getUsers();
    }

    getUsers() {
        this.httpClient.get(URL_CONFIG.usersList)
        .subscribe((data:any)=> {
         this.showNoDataError = data['success'].length == 0 || !data['success'];
         this.apexFired = false;
         this.usersListData = data['success'];
         this.reArrangeUsersList()
        },
        err=>{
         this.apexFired = false;
         this.showNoDataError = true;
         console.log(err)
        })
    }

    reArrangeUsersList() {
        const index             = this.usersListData.findIndex(obj => obj.userId == this.userDetails.userId);
        const [mainUserDetails] = this.usersListData.splice(index,1);
        this.usersListData.unshift(mainUserDetails);
    }

    onShowUserPopup(addOrEdit:string, person?:any) {
        this.addOrEdit = addOrEdit;
        if (addOrEdit == 'Add') {
            this.userModel      = new UserModel();
            this.userModalTitle = 'Add New User';
            this.openModal()
        }
        if(addOrEdit == 'Edit') {
            this.userModalTitle = 'Edit User';
            this.openModal(person)
        }
    }

    openModal(person?:any) {
        this.elementRef = this.ngbModal.open(UserInfoComponent);
        let data = {};
        data['addOrEdit']      = this.addOrEdit;
        data['userModalTitle'] = this.userModalTitle;
        data['userModel']      = this.addOrEdit == 'Edit' ? person : this.userModel;
        this.elementRef.componentInstance.data = data;

        this.elementRef.result
        .then((result)=> {
            this.submitUser(result,this.addOrEdit)
        })
        .catch((response)=> {
           if(response) console.log(response)
        })
    }

    submitUser(userObj:UserModel, addOrEdit:string) {
        let reqObj = {
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            roleId: userObj.roleId,
            email: userObj.lastName,
            password: userObj.password,
            status:1
        };

        let url = addOrEdit == 'Edit' ? URL_CONFIG.updateUser + userObj.userId : URL_CONFIG.addUser;
        this.httpClient.put(url,reqObj).subscribe((data:any)=> {
            if(data.success) {
                this.getUsers();
            }
        }, err => {
            console.log(err)
        })
    }

    onDeleteUser(userId) {
        this.httpClient.delete(URL_CONFIG.deleteUser + userId)
        .subscribe((data:any)=> {
            if(data.success) {
                this.getUsers()
            }
        }, err => {
            console.log(err)
        })
    }
    
}