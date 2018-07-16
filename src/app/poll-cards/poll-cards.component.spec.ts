import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCardsComponent } from './poll-cards.component';

describe('PollCardsComponent', () => {
  let component: PollCardsComponent;
  let fixture: ComponentFixture<PollCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
