import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFcComponent } from './add-edit-fc.component';

describe('AddEditFcComponent', () => {
  let component: AddEditFcComponent;
  let fixture: ComponentFixture<AddEditFcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFcComponent]
    });
    fixture = TestBed.createComponent(AddEditFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
