import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPaiementComponent } from './add-edit-paiement.component';

describe('AddEditPaiementComponent', () => {
  let component: AddEditPaiementComponent;
  let fixture: ComponentFixture<AddEditPaiementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPaiementComponent]
    });
    fixture = TestBed.createComponent(AddEditPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
