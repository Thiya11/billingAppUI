import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'lib-core',
  templateUrl:'core.component.html',
})
export class CoreComponent implements OnInit {
  public showMainMenu:boolean = false;
  constructor(private router:Router) {

  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(a => this.router.routerState.root),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe((data) => {
      this.showMainMenu = data[0]?.breadCrumbText == 'LOGIN' || data[0]?.breadCrumbText == 'REGISTER';
    })
  }

}
