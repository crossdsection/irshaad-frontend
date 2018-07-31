import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnactCardsComponent } from './enact-cards.component';

describe('EnactCardsComponent', () => {
  let component: EnactCardsComponent;
  let fixture: ComponentFixture<EnactCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnactCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnactCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
