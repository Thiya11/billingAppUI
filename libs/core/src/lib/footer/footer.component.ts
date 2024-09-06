import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { StorageService } from 'libs/shared/services/storage.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  public footerConfigs:any;
  public fixedFooter:boolean = false;

  constructor(
    private storageService:StorageService,
    private router: Router
  ){
    this.footerConfigs = this.storageService.footerConfigDetails;
  }

  ngOnInit(): void {
   this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map((a:any) => this.router.routerState.root),
    map((route:any) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }),
    mergeMap((route:any) => route.data)
   ).subscribe((data:any)=> {
     this.fixedFooter = data[0].breadCrumbText == 'LOGIN'
   })
  }

}
