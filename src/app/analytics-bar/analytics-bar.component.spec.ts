import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsBarComponent } from './analytics-bar.component';

describe('AnalyticsBarComponent', () => {
  let component: AnalyticsBarComponent;
  let fixture: ComponentFixture<AnalyticsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
