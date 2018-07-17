import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMegaMenuComponent } from './location-mega-menu.component';

describe('LocationMegaMenuComponent', () => {
  let component: LocationMegaMenuComponent;
  let fixture: ComponentFixture<LocationMegaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationMegaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMegaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
