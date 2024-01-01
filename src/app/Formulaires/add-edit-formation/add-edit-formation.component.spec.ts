import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFormationComponent } from './add-edit-formation.component';

describe('AddEditFormationComponent', () => {
  let component: AddEditFormationComponent;
  let fixture: ComponentFixture<AddEditFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFormationComponent]
    });
    fixture = TestBed.createComponent(AddEditFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
