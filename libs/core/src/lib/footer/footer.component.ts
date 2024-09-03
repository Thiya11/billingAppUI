import { Component } from '@angular/core';
import { StorageService } from 'libs/shared/services/storage.service';

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public footerConfigs:any;

  constructor(private storageService:StorageService){
    this.footerConfigs = this.storageService.footerConfigDetails;
  }

}
