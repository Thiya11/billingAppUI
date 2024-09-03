import { Component, DoCheck, Input, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { MAIN_MENU_LIST } from 'libs/shared/configs/partners-config';
import { CommonService } from 'libs/shared/services/common.service';
import { StorageService } from 'libs/shared/services/storage.service';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public mainMenuList:Array<any> = [];
  public siteConfigs:any;
  @Input() hideHeaderFooter:boolean;

  constructor(private commonService:CommonService,
              private storageService: StorageService,
              private router: Router
  ) {
    this.siteConfigs  = this.storageService.mainConfigDetails;
    this.mainMenuList = this.commonService.setMenuListUrls(MAIN_MENU_LIST, this.siteConfigs.siteAbbr);
 
  }

  logOut() {
     if(this.commonService.logOut()) {
      this.router.navigate(['/login'])
     }
  }

}
