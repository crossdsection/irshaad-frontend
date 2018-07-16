import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactFeedsFocusComponent } from './enact-feeds-focus.component';

describe('EnactFeedsFocusComponent', () => {
  let component: EnactFeedsFocusComponent;
  let fixture: ComponentFixture<EnactFeedsFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactFeedsFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactFeedsFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
