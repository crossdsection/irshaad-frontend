import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCardComponent } from './poll-card.component';

describe('PollCardComponent', () => {
  let component: PollCardComponent;
  let fixture: ComponentFixture<PollCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
