import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFraisComponent } from './edit-frais.component';

describe('EditFraisComponent', () => {
  let component: EditFraisComponent;
  let fixture: ComponentFixture<EditFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFraisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
