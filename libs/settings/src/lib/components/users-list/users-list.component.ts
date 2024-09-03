import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ERROR_MESSAGES, EXISTING_ROLES } from "libs/shared/configs/general-values";
import { URL_CONFIG } from "libs/shared/configs/url-mapper";
import { StorageService } from "libs/shared/services/storage.service";

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

    constructor(private httpClient:HttpClient,
                private storageService:StorageService
    ){
        this.userDetails = this.storageService.userDetails;
    }

    ngOnInit(): void {
        this.apexFired = true;
        this.httpClient.get(URL_CONFIG.usersList)
       .subscribe((data:any)=> {
        this.showNoDataError = data.length == 0 || !data;
        this.apexFired = false;
        this.usersListData = data;
        this.reArrangeUsersList()
       },
       err=>{
        this.apexFired = false;
        this.showNoDataError = true;
        console.log(err)
       })
    }

    reArrangeUsersList() {
        const index             = this.usersListData.findIndex(obj => obj.user_id == this.userDetails.userId);
        const [mainUserDetails] = this.usersListData.splice(index,1);
        this.usersListData.unshift(mainUserDetails);
    }

    
}