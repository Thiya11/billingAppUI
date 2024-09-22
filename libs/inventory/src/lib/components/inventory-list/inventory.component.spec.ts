import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryComponent } from '../inventory-list/inventory.component';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventoryComponent]
    });
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
