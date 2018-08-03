import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightOverlayComponent } from './right-overlay.component';

describe('RightOverlayComponent', () => {
  let component: RightOverlayComponent;
  let fixture: ComponentFixture<RightOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
