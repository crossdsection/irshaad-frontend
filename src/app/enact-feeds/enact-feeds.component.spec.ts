import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactFeedsComponent } from './enact-feeds.component';

describe('EnactFeedsComponent', () => {
  let component: EnactFeedsComponent;
  let fixture: ComponentFixture<EnactFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
