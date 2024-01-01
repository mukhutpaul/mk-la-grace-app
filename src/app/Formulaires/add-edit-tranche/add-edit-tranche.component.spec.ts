import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrancheComponent } from './add-edit-tranche.component';

describe('AddEditTrancheComponent', () => {
  let component: AddEditTrancheComponent;
  let fixture: ComponentFixture<AddEditTrancheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTrancheComponent]
    });
    fixture = TestBed.createComponent(AddEditTrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
