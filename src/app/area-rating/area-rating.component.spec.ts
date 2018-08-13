import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaRatingComponent } from './area-rating.component';

describe('AreaRatingComponent', () => {
  let component: AreaRatingComponent;
  let fixture: ComponentFixture<AreaRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
