import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactionLinkComponent } from './enaction-link.component';

describe('EnactionLinkComponent', () => {
  let component: EnactionLinkComponent;
  let fixture: ComponentFixture<EnactionLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactionLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
