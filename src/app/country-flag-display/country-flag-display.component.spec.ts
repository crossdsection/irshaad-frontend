import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryFlagDisplayComponent } from './country-flag-display.component';

describe('CountryFlagDisplayComponent', () => {
  let component: CountryFlagDisplayComponent;
  let fixture: ComponentFixture<CountryFlagDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryFlagDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFlagDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
