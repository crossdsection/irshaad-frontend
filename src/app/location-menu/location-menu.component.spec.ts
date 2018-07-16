import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMenuComponent } from './location-menu.component';

describe('LocationMenuComponent', () => {
  let component: LocationMenuComponent;
  let fixture: ComponentFixture<LocationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
