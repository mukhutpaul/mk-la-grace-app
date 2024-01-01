import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStagiaireComponent } from './add-edit-stagiaire.component';

describe('AddEditStagiaireComponent', () => {
  let component: AddEditStagiaireComponent;
  let fixture: ComponentFixture<AddEditStagiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditStagiaireComponent]
    });
    fixture = TestBed.createComponent(AddEditStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
