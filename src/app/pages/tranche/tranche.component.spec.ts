import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancheComponent } from './tranche.component';

describe('TrancheComponent', () => {
  let component: TrancheComponent;
  let fixture: ComponentFixture<TrancheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrancheComponent]
    });
    fixture = TestBed.createComponent(TrancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
