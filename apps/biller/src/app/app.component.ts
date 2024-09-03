import { Component } from '@angular/core';
import { StorageService } from 'libs/shared/services/storage.service';
import { FOOTER_DETAILS, SITE_CONFIGS } from './configs/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'biller application';

  constructor (private storageService:StorageService) {
    this.storageService.mainConfigDetails   = SITE_CONFIGS;
    this.storageService.footerConfigDetails = FOOTER_DETAILS;
  }
}
