import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FFraisComponent } from './ffrais.component';

describe('FFraisComponent', () => {
  let component: FFraisComponent;
  let fixture: ComponentFixture<FFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FFraisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
