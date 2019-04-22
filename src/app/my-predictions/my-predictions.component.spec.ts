import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPredictionsComponent } from './my-predictions.component';

describe('MyPredictionsComponent', () => {
  let component: MyPredictionsComponent;
  let fixture: ComponentFixture<MyPredictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPredictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
