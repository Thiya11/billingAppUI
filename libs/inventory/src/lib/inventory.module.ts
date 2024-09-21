import { NgModule } from '@angular/core';
import { InventoryComponent } from './components/inventory-list/inventory.component';
import { InventoryRouting } from './inventory-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'libs/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InventoryInfoComponent } from './components/inventory-info/inventory-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedValidatorsModule } from 'libs/shared/modules/shared-validators.module';



@NgModule({
  declarations: [
    InventoryComponent,
    InventoryInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedValidatorsModule,
    NgSelectModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    InventoryRouting
  ],
  exports: [
    InventoryComponent
  ]
})
export class InventoryModule { }
