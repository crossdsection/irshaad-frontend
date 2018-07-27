import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactPopupComponent } from './enact-popup.component';

describe('EnactPopupComponent', () => {
  let component: EnactPopupComponent;
  let fixture: ComponentFixture<EnactPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
